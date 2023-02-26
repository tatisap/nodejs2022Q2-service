import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { convertObjectToString } from 'src/utilities';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const { method, url, query, params, body } = req;
    this.loggingService.log(
      `\nRequest: ${method} ${url}\n${
        params ? convertObjectToString('Params:\n', params) : ''
      }${query ? convertObjectToString('Query:\n', query) : ''}${
        body ? convertObjectToString('Body:\n', body) : ''
      }`,
    );
    next();
  }
}
