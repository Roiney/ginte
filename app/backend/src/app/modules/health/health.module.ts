import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { PrismaOrmHealthIndicator } from './prisma.health.service';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [PrismaOrmHealthIndicator],
})
export class HealthModule {}
