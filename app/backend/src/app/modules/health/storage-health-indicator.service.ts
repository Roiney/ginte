import { Injectable } from '@nestjs/common';
import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError,
} from '@nestjs/terminus';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class StorageHealthIndicator extends HealthIndicator {
  constructor(private readonly storage: StorageService) {
    super();
  }

  async isHealthy(bucketName: string): Promise<HealthIndicatorResult> {
    const key = 'google-cloud-storage';
    try {
      await this.storage.isBucketAvailable(bucketName);
      return this.getStatus(key, true);
    } catch (error: any) {
      throw new HealthCheckError(
        'Google Cloud Storage check failed',
        this.getStatus(key, false, { message: error.message }),
      );
    }
  }
}
