import { join } from 'node:path';
import { Buffer } from 'node:buffer';
import { Injectable, ConsoleLogger, LogLevel } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  accessSync,
  appendFileSync,
  mkdirSync,
  statSync,
  writeFileSync,
} from 'node:fs';

@Injectable()
export class LoggingService extends ConsoleLogger {
  private readonly maxFileSize: number;
  private readonly logFolderPath: string;
  private readonly filePaths: { error: string; other: string };

  constructor(private readonly configService: ConfigService) {
    super(null, { logLevels: configService.get('LOG_LEVELS') });
    this.maxFileSize = configService.get('LOG_FILE_MAX_SIZE');
    this.logFolderPath = configService.get('LOG_FOLDER_PATH');
    this.filePaths = {
      error: join(this.logFolderPath, `${Date.now()}.error.log`),
      other: join(this.logFolderPath, `${Date.now()}.log`),
    };

    mkdirSync(this.logFolderPath, { recursive: true });
    this.addListenersToProcessUncaughtedErrors();
  }

  log(message: any, ...optionalParams: [...any, string?]): void {
    if (!this.isLevelEnabled('log')) {
      return;
    }
    super.log(message, ...optionalParams);
    this.writeToLogFile('log', message, optionalParams);
  }

  error(message: any, ...optionalParams: [...any, string?, string?]): void {
    if (!this.isLevelEnabled('error')) {
      return;
    }
    super.error(message, ...optionalParams);
    this.writeToLogFile('error', message, optionalParams);
  }

  warn(message: any, ...optionalParams: [...any, string?]): void {
    if (!this.isLevelEnabled('warn')) {
      return;
    }
    super.warn(message, ...optionalParams);
    this.writeToLogFile('warn', message, optionalParams);
  }

  debug(message: any, ...optionalParams: [...any, string?]): void {
    if (!this.isLevelEnabled('debug')) {
      return;
    }
    super.debug(message, ...optionalParams);
    this.writeToLogFile('debug', message, optionalParams);
  }

  verbose(message: any, ...optionalParams: [...any, string?]): void {
    if (!this.isLevelEnabled('verbose')) {
      return;
    }
    super.verbose(message, ...optionalParams);
    this.writeToLogFile('verbose', message, optionalParams);
  }

  writeToLogFile(
    logLevel: LogLevel,
    message: any,
    optionalParams: [...any, string?],
  ) {
    const logFileType = logLevel === 'error' ? 'error' : 'other';
    let filePath = this.filePaths[logFileType];
    try {
      accessSync(filePath);
    } catch {
      writeFileSync(filePath, '', 'utf-8');
    }

    const formattedMessage = `${new Date().toString()} ${logLevel.toUpperCase()} ${optionalParams.toString()} ${message}\n`;

    if (this.isLogFileFull(filePath, formattedMessage)) {
      filePath = this.updateLogFileName(logFileType);
      writeFileSync(filePath, '', 'utf-8');
    }

    appendFileSync(filePath, formattedMessage, 'utf-8');
  }

  isLogFileFull(filePath: string, message: string): boolean {
    const logFileSize = statSync(filePath).size;
    const messageSize = Buffer.byteLength(message, 'utf-8');
    return logFileSize + messageSize > this.maxFileSize;
  }

  updateLogFileName(logFileType: 'error' | 'other'): string {
    this.filePaths[logFileType] = join(
      this.logFolderPath,
      `${Date.now()}.${logFileType === 'error' ? 'error.log' : 'log'}`,
    );
    return this.filePaths[logFileType];
  }

  addListenersToProcessUncaughtedErrors(): void {
    process.on('uncaughtException', (err: unknown) => {
      this.error(err, 'UncaughtException');
    });

    process.on('unhandledRejection', (reason) => {
      this.error(`Reason: ${reason}`, 'UnhandledRejection');
    });
  }
}
