import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { wlCloudUser } from 'prisma/prisma-client-db-store';
import { StoreDBPrismaService } from '../db/prisma/storeDBPrismaService.service';
import { AuthService } from './auth.service';

const mockUser: wlCloudUser = {
  id: 'a3ba42d5-ff59-4b8c-8322-ab435605a7d9',
  userName: 'Jonh Doe',
  email: 'john.doe@example.com',
  active: true,
  password: '',
  role: 'USER',
  modifyById: '69f3885d-da15-4363-96f5-e4243a7a9554',
  createdAt: new Date('2024-05-06T17:15:26.479Z'),
  updatedAt: new Date('2024-05-06T17:15:26.479Z'),
  canceledAt: null,
  lastLogin: null,
  organizationId: '40e820bb-2c8f-49f1-9064-4aff0ee7b28b',
};

describe('AuthService', () => {
  let authService: AuthService;
  let sdbPrismaService: StoreDBPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: StoreDBPrismaService,
          useValue: {
            wlCloudUser: {
              findUnique: jest.fn(),
            },
            wlCloudAccessKeys: {
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    sdbPrismaService = module.get<StoreDBPrismaService>(StoreDBPrismaService);
  });

  describe('validateAPIKey', () => {
    it('should return API key details when valid', async () => {
      const mockApiKeyData = {
        id: 'api-key-id',
        apiKey: 'valid-api-key',
        organization: {
          id: 'org-id',
          name: 'Test Organization',
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          canceledAt: null,
          users: [
            {
              id: 'user-id',
              userName: 'User 1',
              email: 'user1@example.com',
              active: true,
              password: 'hashed-password',
              role: 'ADMINISTRATOR',
              createdAt: new Date(),
              updatedAt: new Date(),
              canceledAt: null,
              lastLogin: null,
              organizationId: 'org-id',
              modifyById: null,
            },
          ],
        },
      };

      (
        sdbPrismaService.wlCloudAccessKeys.findUnique as jest.Mock
      ).mockResolvedValue(mockApiKeyData);

      const result = await authService.validateAPIKey('valid-api-key');
      expect(result).toEqual(mockApiKeyData);
    });

    it('should throw BadRequestException if API key is not found', async () => {
      (
        sdbPrismaService.wlCloudAccessKeys.findUnique as jest.Mock
      ).mockResolvedValue(null);

      await expect(
        authService.validateAPIKey('invalid-api-key'),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException on internal error', async () => {
      (
        sdbPrismaService.wlCloudAccessKeys.findUnique as jest.Mock
      ).mockRejectedValue(new Error('Internal error'));

      await expect(authService.validateAPIKey('some-api-key')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('validateUser', () => {
    it('should return a user when user is found and active', async () => {
      jest
        .spyOn(sdbPrismaService.wlCloudUser, 'findUnique')
        .mockResolvedValue(mockUser);

      const result = await authService.validateUser(mockUser.email);
      expect(result).toEqual(mockUser);
    });

    it('should throw BadRequestException if an error occurs during validation', async () => {
      const email = 'test@example.com';
      jest
        .spyOn(sdbPrismaService.wlCloudUser, 'findUnique')
        .mockRejectedValue(new Error('Database error'));

      await expect(authService.validateUser(email)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw UnauthorizedException if user is found but not active', async () => {
      const inactiveUser = { ...mockUser, active: false };

      jest
        .spyOn(sdbPrismaService.wlCloudUser, 'findUnique')
        .mockResolvedValue(inactiveUser);

      await expect(
        authService.validateUser(inactiveUser.email),
      ).rejects.toThrowError(UnauthorizedException);
    });

    it('should throw UnauthorizedException if user not found', async () => {
      const email = 'test@example.com';
      jest
        .spyOn(sdbPrismaService.wlCloudUser, 'findUnique')
        .mockResolvedValue(null);

      await expect(authService.validateUser(email)).rejects.toThrowError(
        UnauthorizedException,
      );
    });
  });
});
