import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackRepository } from '../../lib/repositories';
import { TrackService } from './track.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService, TrackRepository],
  exports: [TrackService],
})
export class TrackModule {}
