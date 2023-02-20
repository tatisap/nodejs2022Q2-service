import { BadRequestException, Injectable } from '@nestjs/common';
import { Album, Artist, Track } from '../lib/entities';
import { CreateTrackDto } from './track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  getAllTracks(where?: FindOptionsWhere<Track>): Promise<Track[]> {
    return this.trackRepository.find({ where });
  }

  getTrack(id: string): Promise<Track | null> {
    return this.trackRepository.findOneBy({ id });
  }

  async createTrack(body: CreateTrackDto): Promise<Track> {
    const { artistId, albumId } = body;
    if (artistId) {
      const artist = await this.artistRepository.findOneBy({ id: artistId });
      if (!artist) {
        throw new BadRequestException(`Artist with id ${artistId} not found`);
      }
    }
    if (albumId) {
      const album = await this.albumRepository.findOneBy({ id: albumId });
      if (!album) {
        throw new BadRequestException(`Album with id ${albumId} not found`);
      }
    }
    const track = this.trackRepository.create(body);
    return this.trackRepository.save(track);
  }

  async updateTrack(id: string, body: Partial<Track>): Promise<Track | null> {
    const trackToUpdate = await this.trackRepository.findOneBy({ id });
    if (!trackToUpdate) {
      return null;
    }
    await this.trackRepository.update({ id }, body);
    return this.trackRepository.findOneBy({ id });
  }

  async deleteTrack(id: string): Promise<DeleteResult | null> {
    const trackToDelete = await this.trackRepository.findOneBy({ id });
    if (!trackToDelete) {
      return null;
    }
    return this.trackRepository.delete({ id });
  }
}
