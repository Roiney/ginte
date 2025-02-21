import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prismaService.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class BackendGatewayPrismaModule {}
