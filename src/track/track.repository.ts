import { Injectable } from '@nestjs/common';
import { Track } from 'lib/entities';
import { db } from 'src/db';
import { CreateTrackDto, UpdateTrackDto } from './track.dto';
import { v4 as uuid } from 'uuid';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TrackRepository {
  findMany(): Track[] {
    return db.tracks;
  }

  findById(id: string): Track | null {
    return db.tracks.find((track) => track.id === id);
  }

  create(body: CreateTrackDto): Track {
    const plainTrack = { id: uuid(), ...body };
    const track = plainToInstance(Track, plainTrack);
    db.tracks.push(track);
    return track;
  }

  update(id: string, body: UpdateTrackDto): Track {
    const track = db.tracks.find((track) => track.id === id);
    Object.assign(track, body);
    return track;
  }

  delete(id: string): string {
    const trackIndex = db.tracks.findIndex((track) => track.id === id);
    db.tracks.splice(trackIndex, 1);
    return 'Deleted';
  }
}
