import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import storageConfig from './config/storage.config';
import { AuthModule } from './security/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [storageConfig],
    }),
    PrismaModule.forRoot({ isGlobal: true }),
    AuthModule,
  ],
})
export class AppModule {}
