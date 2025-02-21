import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { LoggerModule } from './common/middleware/logger.module';
import storageConfig from './config/storage.config';
import { GatewayModule } from './modules/gateway/gateway.module';
import { HealthModule } from './modules/health/health.module';
import { LogsModule } from './modules/logManagement/logs.module';
import { StorageModule } from './modules/storage/storage.module';
import { WebhookModule } from './modules/webhook/webhook.module';
import { AuthModule } from './security/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [storageConfig],
    }),
    PrismaModule.forRoot({ isGlobal: true }),
    HealthModule,
    AuthModule,
    GatewayModule,
    StorageModule,
    WebhookModule,
    LoggerModule,
    LogsModule,
  ],
})
export class AppModule {}
