import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Album } from 'lib/entities';
import { db } from 'src/db';

import { v4 as uuid } from 'uuid';
import { CreateAlbumDto, UpdateAlbumDto } from './album.dto';

@Injectable()
export class AlbumRepository {
  findMany(): Album[] {
    return db.albums;
  }

  findById(id: string): Album | null {
    return db.albums.find((album) => album.id === id);
  }

  create(body: CreateAlbumDto): Album {
    const plainAlbum = { id: uuid(), ...body };
    const album = plainToInstance(Album, plainAlbum);
    db.albums.push(album);
    return album;
  }

  update(id: string, body: UpdateAlbumDto): Album {
    const album = db.albums.find((album) => album.id === id);
    Object.assign(album, body);
    return album;
  }

  delete(id: string): string {
    const albumIndex = db.albums.findIndex((album) => album.id === id);
    db.albums.splice(albumIndex, 1);
    return 'Deleted';
  }
}
