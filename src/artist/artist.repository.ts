import { Injectable } from '@nestjs/common';
import { Artist } from 'lib/entities';
import { CreateArtistDto, UpdateArtistDto } from './artist.dto';
import { v4 as uuid } from 'uuid';
import { db } from 'src/db';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ArtistRepository {
  findMany(): Artist[] {
    return db.artists;
  }

  findById(id: string): Artist | null {
    return db.artists.find((artist) => artist.id === id);
  }

  create(body: CreateArtistDto): Artist {
    const plainArtist = { id: uuid(), ...body };
    const artist = plainToInstance(Artist, plainArtist);
    db.artists.push(artist);
    return artist;
  }

  update(id: string, body: UpdateArtistDto): Artist {
    const artist = db.artists.find((artist) => artist.id === id);
    Object.assign(artist, body);
    return artist;
  }

  delete(id: string): string {
    const artistIndex = db.artists.findIndex((artist) => artist.id === id);
    db.tracks.splice(artistIndex, 1);
    return 'Deleted';
  }
}
