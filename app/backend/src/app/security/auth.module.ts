import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { BackendGatewayPrismaModule } from '../db/prisma/prisma.module';
import { AuthService } from './auth.service';

@Global()
@Module({
  imports: [PassportModule, BackendGatewayPrismaModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
