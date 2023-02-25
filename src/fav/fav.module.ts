import { Module } from '@nestjs/common';
import { AlbumModule } from '../album';
import { ArtistModule } from '../artist';
import { TrackModule } from '../track';
import { FavController } from './fav.controller';
import { FavService } from './fav.service';
@Module({
  imports: [TrackModule, AlbumModule, ArtistModule],
  controllers: [FavController],
  providers: [FavService],
})
export class FavModule {}
