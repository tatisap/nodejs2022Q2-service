import { Injectable } from '@nestjs/common';
import { Artist } from 'lib/entities';
import { db } from 'src/db';
import { Repository } from 'lib/repositories';

@Injectable()
export class ArtistRepository extends Repository<Artist> {
  constructor() {
    super();
    this.db = db.artists;
    this.entity = Artist;
  }
}
