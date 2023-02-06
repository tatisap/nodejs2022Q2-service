import { Injectable } from '@nestjs/common';
import { Album } from 'lib/entities';
import { Repository } from 'lib/repositories';
import { db } from 'src/db';

@Injectable()
export class AlbumRepository extends Repository<Album> {
  constructor() {
    super();
    this.db = db.albums;
    this.entity = Album;
  }
}
