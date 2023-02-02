import { Module } from '@nestjs/common';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { TrackModule } from 'src/track/track.module';
import { FavController } from './fav.controller';
@Module({
  imports: [TrackModule, AlbumModule, ArtistModule],
  controllers: [FavController],
})
export class FavModule {}
