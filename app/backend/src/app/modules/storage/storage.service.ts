import { GetSignedUrlConfig, Storage } from '@google-cloud/storage';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoggerService } from 'src/app/common/middleware/logger.service';

@Injectable()
export class StorageService {
  constructor(private readonly loggerService: LoggerService) {}
  private readonly storage = new Storage();

  async isBucketAvailable(bucketName: string): Promise<boolean> {
    try {
      await this.storage.bucket(bucketName).getFiles({ maxResults: 1 });
      return true;
    } catch (error: any) {
      throw new HttpException(
        'Error accessing bucket: No avaliable bucket',
        error.code === 403 ? HttpStatus.FORBIDDEN : HttpStatus.NOT_FOUND,
      );
    }
  }

  async isFileUploaded(bucketName: string, fileName: string): Promise<boolean> {
    const file = this.storage.bucket(bucketName).file(fileName);
    const [exists] = await file.exists();
    return exists;
  }

  async generateDownloadPresignedUrl(
    bucketName: string,
    fileName: string,
  ): Promise<string> {
    const options: GetSignedUrlConfig = {
      version: 'v4',
      action: 'read',
      expires: Date.now() + 60 * 60 * 1000,
    };

    try {
      const sig = await this.storage
        .bucket(bucketName)
        .file(fileName)
        .getSignedUrl(options);
      const [url] = sig;
      return url;
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      this.loggerService.logError(error);
      throw new HttpException(
        {
          status: HttpStatus.BAD_GATEWAY,
          error: 'Server integration broken',
        },
        HttpStatus.BAD_GATEWAY,
        {
          cause: error,
        },
      );
    }
  }

  async uploadFile(
    file: Express.Multer.File | Buffer,
    fileName: string,
    bucketName: string,
  ): Promise<string> {
    try {
      const bucket = this.storage.bucket(bucketName);
      const blob = bucket.file(fileName);
      const blobStream = blob.createWriteStream({
        resumable: false,
      });

      // Escutar evento de sucesso do upload
      blobStream.on('finish', () => {
        this.loggerService.logInfo(`File ${fileName} uploaded successfully.`);
      });

      // Escutar evento de erro do upload
      blobStream.on('error', (err) => {
        this.loggerService.logError(`Failed to upload file ${fileName}`, err);
        throw new Error('Unable to upload file, something went wrong');
      });

      // Manipulação dependendo se é Buffer ou Express.Multer.File
      if (file instanceof Buffer) {
        blobStream.end(file);
      } else {
        blobStream.end(file.buffer);
      }

      // Gera URL assinada após o upload bem-sucedido
      const downloadUrl = await this.generateDownloadPresignedUrl(
        bucketName,
        fileName,
      );

      return downloadUrl;
    } catch (error) {
      this.loggerService.logError('Error uploading file to GCS', error);
      throw new Error('Failed to upload file');
    }
  }
}
