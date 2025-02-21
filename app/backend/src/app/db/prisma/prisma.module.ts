import { Global, Module } from '@nestjs/common';
import { GntPrismaService } from './prismaService.service';

@Global()
@Module({
  providers: [GntPrismaService],
  exports: [GntPrismaService],
})
export class PrismaModule {}
