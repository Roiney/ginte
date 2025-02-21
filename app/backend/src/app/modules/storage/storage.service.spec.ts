import { Storage } from '@google-cloud/storage';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from 'src/app/common/middleware/logger.service';
import { StorageService } from './storage.service';

// Mock do Storage para substituir todos os métodos e evitar chamadas reais
jest.mock('@google-cloud/storage', () => {
  return {
    Storage: jest.fn().mockImplementation(() => ({
      bucket: jest.fn().mockReturnValue({
        getFiles: jest.fn(),
        file: jest.fn().mockReturnValue({
          exists: jest.fn(),
          getSignedUrl: jest.fn(),
        }),
      }),
    })),
  };
});

describe('StorageService', () => {
  let service: StorageService;
  let mockBucket: jest.Mock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StorageService, Storage, LoggerService],
    }).compile();

    service = module.get<StorageService>(StorageService);

    // Obter referência ao mock do bucket
    mockBucket = (service as any).storage.bucket;
  });

  describe('isBucketAvailable', () => {
    it('deve retornar true se o bucket está acessível', async () => {
      // Simulando o retorno de sucesso diretamente no mock do bucket
      mockBucket().getFiles.mockResolvedValueOnce([[], null]);

      const result = await service.isBucketAvailable('my-test-bucket');
      expect(result).toBe(true);

      expect(mockBucket().getFiles).toHaveBeenCalledWith({
        maxResults: 1,
      });
    });

    it('deve lançar HttpException com status FORBIDDEN se o erro tiver código 403', async () => {
      const error = new Error('Forbidden');
      (error as any).code = 403;
      mockBucket().getFiles.mockRejectedValueOnce(error);

      await expect(
        service.isBucketAvailable('my-test-bucket'),
      ).rejects.toThrowError(
        new HttpException(
          'Error accessing bucket: No avaliable bucket',
          HttpStatus.FORBIDDEN,
        ),
      );
    });

    it('deve lançar HttpException com status NOT_FOUND se o erro não tiver código 403', async () => {
      const error = new Error('Not Found');
      (error as any).code = 404;
      mockBucket().getFiles.mockRejectedValueOnce(error);

      await expect(
        service.isBucketAvailable('my-test-bucket'),
      ).rejects.toThrowError(
        new HttpException(
          'Error accessing bucket: No avaliable bucket',
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe('isFileUploaded', () => {
    it('deve retornar true se o arquivo existe no bucket', async () => {
      // Simulando que o arquivo existe
      (service as any).storage
        .bucket()
        .file()
        .exists.mockResolvedValueOnce([true]);

      const result = await service.isFileUploaded(
        'my-test-bucket',
        'my-file.txt',
      );
      expect(result).toBe(true);
      expect(
        (service as any).storage.bucket().file().exists,
      ).toHaveBeenCalledWith();
    });

    it('deve retornar false se o arquivo não existe no bucket', async () => {
      // Simulando que o arquivo não existe
      (service as any).storage
        .bucket()
        .file()
        .exists.mockResolvedValueOnce([false]);

      const result = await service.isFileUploaded(
        'my-test-bucket',
        'my-file.txt',
      );
      expect(result).toBe(false);
      expect(
        (service as any).storage.bucket().file().exists,
      ).toHaveBeenCalledWith();
    });
  });

  describe('generateDownloadPresignedUrl', () => {
    it('deve retornar uma URL assinada se o arquivo estiver no bucket', async () => {
      const mockUrl = 'https://example.com/signed-url';
      // Simulando a geração bem-sucedida da URL assinada
      (service as any).storage
        .bucket()
        .file()
        .getSignedUrl.mockResolvedValueOnce([mockUrl]);

      const result = await service.generateDownloadPresignedUrl(
        'my-test-bucket',
        'my-file.txt',
      );
      expect(result).toBe(mockUrl);
      expect(
        (service as any).storage.bucket().file().getSignedUrl,
      ).toHaveBeenCalledWith({
        version: 'v4',
        action: 'read',
        expires: expect.any(Number), // Verificando que o expiration timestamp foi configurado
      });
    });

    it('deve lançar HttpException com status BAD_GATEWAY se ocorrer um erro ao gerar a URL', async () => {
      const error = new Error('Server integration broken');
      // Simulando um erro ao gerar a URL assinada
      (service as any).storage
        .bucket()
        .file()
        .getSignedUrl.mockRejectedValueOnce(error);

      await expect(
        service.generateDownloadPresignedUrl('my-test-bucket', 'my-file.txt'),
      ).rejects.toThrowError(
        new HttpException(
          {
            status: HttpStatus.BAD_GATEWAY,
            error: 'Server integration broken',
          },
          HttpStatus.BAD_GATEWAY,
          {
            cause: error,
          },
        ),
      );
    });
  });

  describe('uploadFile', () => {
    it('deve fazer o upload do arquivo e retornar a URL de download', async () => {
      const mockUrl = 'https://example.com/signed-url';
      const mockFile = Buffer.from('conteúdo do arquivo');
      const fileName = 'my-file.txt';
      const bucketName = 'my-test-bucket';

      // Mock para gerar a URL assinada
      jest
        .spyOn(service, 'generateDownloadPresignedUrl')
        .mockResolvedValueOnce(mockUrl);

      // Mock para o stream de upload
      const mockBlobStream = {
        on: jest.fn((event, callback) => {
          if (event === 'finish') callback(); // Simula o evento "finish"
        }),
        end: jest.fn(),
      };

      // Mock completo para o encadeamento bucket -> file -> createWriteStream
      (service as any).storage.bucket = jest.fn().mockReturnValue({
        file: jest.fn().mockReturnValue({
          createWriteStream: jest.fn().mockReturnValue(mockBlobStream),
        }),
      });

      const result = await service.uploadFile(mockFile, fileName, bucketName);
      expect(result).toBe(mockUrl);
      expect(mockBlobStream.end).toHaveBeenCalledWith(mockFile);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.generateDownloadPresignedUrl).toHaveBeenCalledWith(
        bucketName,
        fileName,
      );
    });

    it('deve lançar erro geral se ocorrer um problema inesperado', async () => {
      const mockFile = Buffer.from('conteúdo do arquivo');
      const fileName = 'my-file.txt';
      const bucketName = 'my-test-bucket';

      jest
        .spyOn(service, 'generateDownloadPresignedUrl')
        .mockRejectedValueOnce(new Error('Erro inesperado'));

      await expect(
        service.uploadFile(mockFile, fileName, bucketName),
      ).rejects.toThrowError('Failed to upload file');
    });
  });
});
