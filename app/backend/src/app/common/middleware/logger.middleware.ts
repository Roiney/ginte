import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import pinoHttp from 'pino-http';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = pinoHttp({
    level: 'info',
  });

  use(req: Request, res: Response, next: () => void): void {
    this.logger(req, res);

    const startTime = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - startTime;
      const user = req.user ?? null;

      // Logando a resposta
      this.logger.logger.info({
        method: req.method,
        url: req.originalUrl,
        headers: req.headers,
        status: res.statusCode,
        duration,
        user,
      });
    });

    // Capturando erros
    res.on('error', (err) => {
      this.logger.logger.error({
        message: 'Error processing request',
        error: err.message,
        method: req.method,
        url: req.originalUrl,
      });
    });

    next();
  }
}
