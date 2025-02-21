import { Request } from 'express';
import { JWTPayload } from './PayloadJWT.interface';

export interface AuthRequestJwt extends Request {
  user: JWTPayload;
}
