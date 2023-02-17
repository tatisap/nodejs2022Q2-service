import { Module } from '@nestjs/common';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { TrackModule } from 'src/track/track.module';
import { FavController } from './fav.controller';
import { FavService } from './fav.service';
@Module({
  imports: [TrackModule, AlbumModule, ArtistModule],
  controllers: [FavController],
  providers: [FavService],
})
export class FavModule {}
