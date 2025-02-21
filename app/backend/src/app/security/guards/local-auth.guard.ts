import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext): any {
    return super.canActivate(context);
  }

  handleRequest(err: { message: any }, user: any): any {
    if (err || !user) {
      throw new UnauthorizedException(err?.message);
    }

    return user;
  }
}
