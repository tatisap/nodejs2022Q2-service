import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggingModule } from './logging';
import { AllExceptionsFilter } from './filter';
import { AuthModule } from './auth';
import { UserModule } from './user';
import { ArtistModule } from './artist';
import { TrackModule } from './track';
import { AlbumModule } from './album';
import { FavModule } from './fav';
import {
  appConfig,
  dbConfig,
  authConfig,
  loggingConfig,
  configSchema,
} from './config';
import { LoggingMiddleware } from './logging/logging.middleware';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('DATABASE'),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavModule,
    ConfigModule.forRoot({
      load: [appConfig, dbConfig, loggingConfig, authConfig],
      validationSchema: configSchema,
    }),
    LoggingModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
