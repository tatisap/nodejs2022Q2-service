import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { FavModule } from './fav/fav.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig, dbConfig, authConfig, configSchema } from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

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
