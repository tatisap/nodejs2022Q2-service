import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth';
import { UserModule } from './user';
import { ArtistModule } from './artist';
import { TrackModule } from './track';
import { AlbumModule } from './album';
import { FavModule } from './fav';
import { appConfig, dbConfig, authConfig, configSchema } from './config';

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
      load: [appConfig, dbConfig, authConfig],
      validationSchema: configSchema,
    }),
  ],
})
export class AppModule {}
