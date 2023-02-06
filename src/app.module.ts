import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { FavModule } from './fav/fav.module';
import { ConfigModule } from '@nestjs/config';
import { appConfig, configSchema } from './config';

@Module({
  imports: [
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavModule,
    ConfigModule.forRoot({ load: [appConfig], validationSchema: configSchema }),
  ],
})
export class AppModule {}
