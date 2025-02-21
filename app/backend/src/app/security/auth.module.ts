import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../db/prisma/prisma.module';
import { UserModule } from '../modules/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt-auth.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Global()
@Module({
  imports: [
    PassportModule,
    PrismaModule,
    UserModule,
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: process.env.AUTH_SECRET,
          signOptions: { expiresIn: '86400s' },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [LocalStrategy, JwtStrategy, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
