import { Injectable } from '@nestjs/common';
import { Artist } from '../lib/entities';
import { CreateArtistDto } from './artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}
  getAllArtists(where?: FindOptionsWhere<Artist>): Promise<Artist[]> {
    return this.artistRepository.find({ where });
  }

  getArtist(id: string): Promise<Artist | null> {
    return this.artistRepository.findOneBy({ id });
  }

  async createArtist(body: CreateArtistDto): Promise<Artist> {
    const artist = this.artistRepository.create(body);
    return this.artistRepository.save(artist);
  }

  async updateArtist(
    id: string,
    body: Partial<Artist>,
  ): Promise<Artist | null> {
    const artistToUpdate = await this.artistRepository.findOneBy({ id });
    if (!artistToUpdate) {
      return null;
    }
    await this.artistRepository.update({ id }, body);
    return this.artistRepository.findOneBy({ id });
  }

  async deleteArtist(id: string): Promise<DeleteResult | null> {
    const artistToDelete = await this.artistRepository.findOneBy({ id });
    if (!artistToDelete) {
      return null;
    }
    return this.artistRepository.delete({ id });
  }
}
