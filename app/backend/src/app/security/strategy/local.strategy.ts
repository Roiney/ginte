import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { gntUser } from '@prisma/client';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<gntUser> {
    const user = await this.authService.validateUserMail(email, password);
    if (!user) {
      throw new UnauthorizedException(
        'Invalid credentials. Please check your email and password and try again',
      );
    }

    return user;
  }
}
