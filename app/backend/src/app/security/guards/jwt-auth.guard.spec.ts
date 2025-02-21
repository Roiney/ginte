import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';

describe('JwtAuthGuard', () => {
  let jwtAuthGuard: JwtAuthGuard;
  let jwtServiceMock: JwtService;
  let reflectorMock: Reflector;
  let configServiceMock: jest.Mocked<ConfigService>;

  beforeEach(() => {
    jwtServiceMock = {} as any;
    reflectorMock = {} as any;
    configServiceMock = {
      get: jest.fn(),
    } as any;

    jwtAuthGuard = new JwtAuthGuard(
      jwtServiceMock,
      reflectorMock,
      configServiceMock,
    );
  });

  it('should allow authentication if route is marked as public', async () => {
    // Mocking reflector to return true for IS_PUBLIC_KEY
    reflectorMock.getAllAndOverride = jest.fn().mockReturnValue(true);

    const contextMock = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn(),
      }),
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as unknown as ExecutionContext;

    const result = await jwtAuthGuard.canActivate(contextMock);

    expect(result).toBe(true);
  });

  it('should throw UnauthorizedException if invalid token provided', async () => {
    configServiceMock.get.mockReturnValue(
      'eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV',
    );

    reflectorMock.getAllAndOverride = jest.fn().mockReturnValue(false);

    // Mocking jwtService to throw an error for invalid token
    jwtServiceMock.verifyAsync = jest
      .fn()
      .mockRejectedValue(new Error('Invalid token'));

    const contextMock = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({
          headers: {
            authorization: 'Bearer invalid_token',
          },
        }),
      }),
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as unknown as ExecutionContext;

    await expect(jwtAuthGuard.canActivate(contextMock)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should allow authentication if valid token provided', async () => {
    // Mocking the payload of the token
    const payload = {
      username: 'Jonh Doe',
      email: 'john.doe@example.com',
      sub: 'a3ba42d5-ff59-4b8c-8322-ab435605a7d9',
      role: 'USER',
      iat: 1715087662,
      exp: 1715174062,
    };

    // Mocking configServiceMock.get to return the secret
    configServiceMock.get.mockReturnValue('your_secret_here');

    // Mocking reflector to return false for IS_PUBLIC_KEY
    reflectorMock.getAllAndOverride = jest.fn().mockReturnValue(false);

    // Mocking jwtServiceMock to return the payload when verifyAsync is called
    // Simula a implementação de verifyAsync que retorna uma promessa resolvida com o payload
    jwtServiceMock.verifyAsync = jest.fn().mockImplementation(async () => {
      return await Promise.resolve(payload);
    });

    const contextMock = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({
          headers: {
            authorization: 'Bearer your_valid_token_here',
          },
        }),
      }),
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as unknown as ExecutionContext;

    const result = await jwtAuthGuard.canActivate(contextMock);

    expect(result).toBe(true);
  });
});
