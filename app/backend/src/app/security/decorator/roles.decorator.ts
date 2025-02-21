import { SetMetadata } from '@nestjs/common';
import { Role } from 'prisma/prisma-client-db-store';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]): MethodDecorator =>
  SetMetadata(ROLES_KEY, roles);
