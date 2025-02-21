import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { JWTPayload } from '../interface/PayloadJWT.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    const secret = process.env.AUTH_SECRET;
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: JWTPayload): Promise<JWTPayload> {
    try {
      const { id } = await this.authService.validateUser(payload.email);

      if (!id) {
        throw new UnauthorizedException('Unauthenticated user');
      }
      return payload;
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }
}
