import { Injectable } from '@nestjs/common';
import { Track } from 'lib/entities';
import { db } from 'src/db';
import { Repository } from 'lib/repositories';

@Injectable()
export class TrackRepository extends Repository<Track> {
  constructor() {
    super();
    this.db = db.tracks;
    this.entity = Track;
  }
}
