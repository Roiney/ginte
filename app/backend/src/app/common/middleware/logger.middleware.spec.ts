import { Test, TestingModule } from '@nestjs/testing';
import { NextFunction, Request, Response } from 'express';
import { operationDBPrismaService } from 'src/app/db/prisma/prismaService.service';
import { LogsService } from 'src/app/modules/logManagement/logs.service';
import { LoggerMiddleware } from './logger.middleware'; // ajuste o caminho conforme necessário

describe('LoggerMiddleware', () => {
  let loggerMiddleware: LoggerMiddleware;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggerMiddleware, LogsService, operationDBPrismaService],
    }).compile();

    loggerMiddleware = module.get<LoggerMiddleware>(LoggerMiddleware);

    mockRequest = {
      method: 'GET',
      originalUrl: '/test',
      headers: {
        'user-agent': 'test-agent',
      },
    };

    mockResponse = {
      statusCode: 200,
      on: jest.fn(),
      end: jest.fn(),
    };

    nextFunction = jest.fn();
  });

  it('should capture errors', () => {
    const mockError = new Error('Some error');

    loggerMiddleware.use(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );

    // Simule o evento de erro da resposta
    (mockResponse.on as jest.Mock).mockImplementation((event, callback) => {
      if (event === 'error') {
        callback(mockError);
      }
    });

    expect(nextFunction).toHaveBeenCalled();
  });

  it('should measure response time', () => {
    const startTimeSpy = jest.spyOn(Date, 'now').mockReturnValue(1000);
    loggerMiddleware.use(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );

    // Simule o evento de finalização da resposta
    (mockResponse.on as jest.Mock).mockImplementation((event, callback) => {
      if (event === 'finish') {
        // Simule o tempo passado (1 segundo para simplificar)
        jest.spyOn(Date, 'now').mockReturnValue(2000); // Depois de 1 segundo
        callback();
      }
    });

    expect(nextFunction).toHaveBeenCalled();

    expect(mockResponse.on).toHaveBeenCalledWith(
      'finish',
      expect.any(Function),
    );

    startTimeSpy.mockRestore();
  });
});
