import { Injectable } from '@nestjs/common';
import { Artist } from 'lib/entities';
import { CreateArtistDto, UpdateArtistDto } from './artist.dto';
import { ArtistRepository } from './artist.repository';

@Injectable()
export class ArtistService {
  constructor(private readonly artistRepository: ArtistRepository) {}
  getAllArtists(): Artist[] {
    return this.artistRepository.findMany();
  }

  getArtist(id: string): Artist | null {
    return this.artistRepository.findById(id);
  }

  createArtist(body: CreateArtistDto): Artist {
    return this.artistRepository.create(body);
  }

  updateArtist(id: string, body: UpdateArtistDto): Artist | null {
    const artistToUpdate = this.artistRepository.findById(id);
    if (!artistToUpdate) {
      return null;
    }
    return this.artistRepository.update(id, body);
  }

  deleteArtist(id: string): [Artist] | null {
    const artistToDelete = this.artistRepository.findById(id);
    if (!artistToDelete) {
      return null;
    }
    return this.artistRepository.delete(id);
  }
}
