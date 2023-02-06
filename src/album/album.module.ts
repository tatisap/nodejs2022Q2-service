import { Module } from '@nestjs/common';
import { TrackModule } from 'src/track/track.module';
import { AlbumController } from './album.controller';
import { AlbumRepository } from '../../lib/repositories';
import { AlbumService } from './album.service';

@Module({
  imports: [TrackModule],
  controllers: [AlbumController],
  providers: [AlbumService, AlbumRepository],
  exports: [AlbumService],
})
export class AlbumModule {}
