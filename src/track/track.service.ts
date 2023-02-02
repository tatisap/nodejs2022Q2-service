import { Injectable } from '@nestjs/common';
import { Track } from 'lib/entities';
import { Property } from 'lib/types';
import { CreateTrackDto } from './track.dto';
import { TrackRepository } from './track.repository';

@Injectable()
export class TrackService {
  constructor(private readonly trackRepository: TrackRepository) {}

  getAllTracks(property?: Property<Track>): Track[] {
    return this.trackRepository.findMany(property);
  }

  getTrack(id: string): Track | null {
    return this.trackRepository.findById(id);
  }

  createTrack(body: CreateTrackDto): Track {
    return this.trackRepository.create({ ...body, isFavorite: false });
  }

  updateTrack(id: string, body: Partial<Track>): Track | null {
    const trackToUpdate = this.trackRepository.findById(id);
    if (!trackToUpdate) {
      return null;
    }
    return this.trackRepository.update(id, body);
  }

  deleteTrack(id: string): Track | null {
    const trackToDelete = this.trackRepository.findById(id);
    if (!trackToDelete) {
      return null;
    }
    const [deletedTrack] = this.trackRepository.delete(id);
    return deletedTrack;
  }
}
