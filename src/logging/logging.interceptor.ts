import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggingService: LoggingService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const response: Response = context.switchToHttp().getResponse();
        const { statusCode } = response;
        this.loggingService.log(`\nResponse: ${statusCode}`);
        this.loggingService.verbose(`Response data: ${JSON.stringify(data)}\n`);
        return data;
      }),
    );
  }
}
