import { INestApplication, Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { operationDBPrismaService } from './prismaService.service';

describe('gatewayDBPrismaService', () => {
  let service: operationDBPrismaService;
  let mockApp: INestApplication;
  let loggerSpy: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [operationDBPrismaService],
    }).compile();

    service = module.get<operationDBPrismaService>(operationDBPrismaService);
    mockApp = { close: jest.fn() } as unknown as INestApplication;
    loggerSpy = jest.spyOn(Logger.prototype, 'log');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should log and connect to the database on module init', async () => {
    // Mock the $connect method to avoid real database connection
    const connectMock = jest.spyOn(service, '$connect').mockResolvedValue();

    await service.onModuleInit();

    expect(loggerSpy).toHaveBeenCalledWith('Connecting to the database...');
    expect(loggerSpy).toHaveBeenCalledWith('Connected to the database.');
    expect(connectMock).toHaveBeenCalled();
  });

  it('should register a shutdown hook and close the app on beforeExit', () => {
    const processOnSpy = jest.spyOn(process, 'on');

    void service.enableShutdownHooks(mockApp);

    expect(processOnSpy).toHaveBeenCalledWith(
      'beforeExit',
      expect.any(Function),
    );

    // Simulate the 'beforeExit' event
    const beforeExitCallback = processOnSpy.mock.calls[0][1];
    beforeExitCallback();

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockApp.close).toHaveBeenCalled();
  });
});
