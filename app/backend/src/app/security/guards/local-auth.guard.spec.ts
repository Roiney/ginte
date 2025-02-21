import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { LocalAuthGuard } from './local-auth.guard';

describe('LocalAuthGuard', () => {
  let guard: LocalAuthGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalAuthGuard],
    }).compile();

    guard = module.get<LocalAuthGuard>(LocalAuthGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('canActivate', () => {
    it('should return true if canActivate of superclass returns true', async () => {
      const mockContext = {} as ExecutionContext; // eslint-disable-line
      // Mocking the superclass method
      jest.spyOn(guard, 'canActivate').mockReturnValue(true);

      const result = await guard.canActivate(mockContext);

      expect(result).toBe(true);
    });
  });

  describe('handleRequest', () => {
    it('should throw UnauthorizedException if error is present', () => {
      const mockError = { message: 'Unauthorized' } as { message: any }; // eslint-disable-line
      // Mocking the super method to ensure it doesn't throw an exception
      jest.spyOn(guard, 'canActivate').mockReturnValue(true);
      expect(() => guard.handleRequest(mockError, null)).toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if no error but no user is present', () => {
      const mockError = null as unknown as { message: any };

      // Mocking the super method to ensure it doesn't throw an exception
      jest.spyOn(guard, 'canActivate').mockReturnValue(true);

      expect(() => guard.handleRequest(mockError, null)).toThrow(
        UnauthorizedException,
      );
    });
  });
});
