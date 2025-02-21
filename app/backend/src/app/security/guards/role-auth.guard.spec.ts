import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UserRole } from '@prisma/client';
import { RolesGuard } from './role-auth.guard';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflectorMock: Reflector;

  beforeEach(() => {
    reflectorMock = {} as any;
    guard = new RolesGuard(reflectorMock);
  });

  it('should allow access if user has required role', () => {
    const userWithRole = { role: [UserRole.ADMIN] };

    // Creating a context mock with the user
    const contextMock: ExecutionContext = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({ user: userWithRole }),
      }),
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as unknown as ExecutionContext;

    reflectorMock.getAllAndOverride = jest
      .fn()
      .mockReturnValue([UserRole.ADMIN]);
    expect(guard.canActivate(contextMock)).toBe(true);
  });
  it('should deny access if user does not have required role', () => {
    const userWithoutRole = { role: [UserRole.USER] }; // Assuming the user does not have the required role

    // Creating a context mock with the user
    const contextMock: ExecutionContext = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({ user: userWithoutRole }),
      }),
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as unknown as ExecutionContext;

    // Assuming 'ADMINISTRATOR' role is required
    reflectorMock.getAllAndOverride = jest
      .fn()
      .mockReturnValue([UserRole.ADMIN]);

    // Asserting that access is denied
    expect(guard.canActivate(contextMock)).toBe(false);
  });
});
