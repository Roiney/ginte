import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { JWTPayload } from '../interface/PayloadJWT.interface';
import { JwtStrategy } from './jwt-auth.strategy';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let configService: ConfigService;
  let authService: AuthService;

  beforeEach(() => {
    configService = new ConfigService();
    jest.spyOn(configService, 'get').mockImplementation((key: string) => {
      if (key === 'secret') {
        return 'my-secret-key';
      }

      return null;
    });

    // Mock da função validateUser
    authService = {
      validateUser: jest.fn().mockResolvedValue({ id: 'user_id' }),
    } as unknown as AuthService;

    jwtStrategy = new JwtStrategy(authService, configService);
  });

  it('should be defined', () => {
    expect(jwtStrategy).toBeDefined();
  });

  describe('validate', () => {
    it('should return user data', async () => {
      const payload: JWTPayload = {
        sub: '123456',
        username: 'testuser',
        email: 'test@example.com',
        role: 'user',
        exp: 1,
        iat: 1,
      };

      const result = await jwtStrategy.validate(payload);

      // Verifica se a função mock foi chamada corretamente
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(authService.validateUser).toHaveBeenCalledWith(payload.email);

      // Verifica se o resultado é o que esperamos
      expect(result).toEqual(payload);
    });

    it('should throw UnauthorizedException if user not found', async () => {
      // Mock da função validateUser que retorna uma promessa rejeitada
      authService.validateUser = jest
        .fn()
        .mockRejectedValue(new Error('User not found'));

      const payload: JWTPayload = {
        sub: '123456',
        username: 'testuser',
        email: 'test@example.com',
        role: 'user',
        exp: 1,
        iat: 1,
      };

      await expect(jwtStrategy.validate(payload)).rejects.toThrowError(
        'User not found',
      );
    });

    it('should throw BadRequestException if validateUser throws error', async () => {
      // Mock da função validateUser que lança uma exceção
      authService.validateUser = jest
        .fn()
        .mockRejectedValue(new Error('Internal server error'));

      const payload: JWTPayload = {
        sub: '123456',
        username: 'testuser',
        email: 'test@example.com',
        role: 'user',
        exp: 1,
        iat: 1,
      };

      await expect(jwtStrategy.validate(payload)).rejects.toThrowError(
        'Internal server error',
      );
    });
  });
});
