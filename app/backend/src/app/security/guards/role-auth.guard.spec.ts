import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'prisma/prisma-client-db-store';
import { RolesGuard } from './role-auth.guard';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflectorMock: Reflector;

  beforeEach(() => {
    reflectorMock = {} as any;
    guard = new RolesGuard(reflectorMock);
  });

  it('should allow access if user has required role', () => {
    const userWithRole = { role: [Role.ADMINISTRATOR] };

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
      .mockReturnValue([Role.ADMINISTRATOR]);
    expect(guard.canActivate(contextMock)).toBe(true);
  });
  it('should deny access if user does not have required role', () => {
    const userWithoutRole = { role: [Role.USER] }; // Assuming the user does not have the required role

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
      .mockReturnValue([Role.ADMINISTRATOR]);

    // Asserting that access is denied
    expect(guard.canActivate(contextMock)).toBe(false);
  });
});
