// import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { gntUser } from '@prisma/client';
import { UserService } from 'src/app/modules/user/user.service';

import { AuthService } from '../auth.service';
import { LocalStrategy } from './local.strategy';

describe('LocalStrategy', () => {
  let localStrategy: LocalStrategy;
  let authService: AuthService;
  let userServiceMock: UserService;
  let jwtServiceMock: JwtService;

  beforeEach(() => {
    userServiceMock = {} as any;
    jwtServiceMock = {} as any;

    authService = new AuthService(
      jwtServiceMock,
      userServiceMock,
      // prismaServiceMock,
    );
    localStrategy = new LocalStrategy(authService);
  });

  it('should return user if credentials are valid', async () => {
    const validUser: gntUser = {
      id: '123',
      email: 'validuser@example.com',
      name: 'validuser',
      password: 'hashedPassword',
      role: 'USER',
      createdAt: new Date(),
      updatedAt: new Date(),
      canceledAt: null,
    };
    jest.spyOn(authService, 'validateUserMail').mockResolvedValue(validUser);

    const result = await localStrategy.validate(
      'validuser@example.com',
      'validpassword',
    );

    expect(result).toEqual(validUser);
  });
});
