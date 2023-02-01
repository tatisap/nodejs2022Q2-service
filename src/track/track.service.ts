import { Injectable } from '@nestjs/common';
import { Track } from 'lib/entities';
import { CreateTrackDto, UpdateTrackDto } from './track.dto';
import { TrackRepository } from './track.repository';

@Injectable()
export class TrackService {
  constructor(private readonly trackRepository: TrackRepository) {}

  getAllTracks(): Track[] {
    return this.trackRepository.findMany();
  }

  getTrack(id: string): Track | null {
    return this.trackRepository.findById(id);
  }

  createTrack(body: CreateTrackDto): Track {
    return this.trackRepository.create(body);
  }

  updateTrack(id: string, body: UpdateTrackDto): Track | null {
    const trackToUpdate = this.trackRepository.findById(id);
    if (!trackToUpdate) {
      return null;
    }
    return this.trackRepository.update(id, body);
  }

  deleteTrack(id: string): [Track] | null {
    const trackToDelete = this.trackRepository.findById(id);
    if (!trackToDelete) {
      return null;
    }
    return this.trackRepository.delete(id);
  }
}
