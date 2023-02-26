import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { LoggingService } from 'src/logging';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly loggingService: LoggingService,
  ) {}
  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let statusCode: number;
    let responseBody: string | object;

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      responseBody = exception.getResponse();
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      responseBody = {
        statusCode,
        message: 'Internal server error',
        error: 'Internal server error',
      };
      this.loggingService.error(exception);
    }
    this.loggingService.warn(`\nResponse: ${statusCode}`);
    this.loggingService.verbose(
      `Response data:${JSON.stringify(responseBody)}\n`,
    );
    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
