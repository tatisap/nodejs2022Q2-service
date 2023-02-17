import { BadRequestException, Injectable } from '@nestjs/common';
import { Album, Artist } from '../lib/entities';
import { CreateAlbumDto } from './album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album) private readonly albumResitory: Repository<Album>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}
  getAllAlbums(where?: FindOptionsWhere<Album>): Promise<Album[]> {
    return this.albumResitory.find({ where });
  }

  getAlbum(id: string): Promise<Album | null> {
    return this.albumResitory.findOneBy({ id });
  }

  async createAlbum(body: CreateAlbumDto): Promise<Album> {
    const { artistId } = body;
    if (artistId) {
      const artist = await this.artistRepository.findOneBy({ id: artistId });
      if (!artist) {
        throw new BadRequestException(`Artist with id ${artistId} not found`);
      }
    }
    const album = this.albumResitory.create(body);
    return this.albumResitory.save(album);
  }

  async updateAlbum(id: string, body: Partial<Album>): Promise<Album | null> {
    const albumToUpdate = await this.albumResitory.findOneBy({ id });
    if (!albumToUpdate) {
      return null;
    }
    await this.albumResitory.update({ id }, body);
    return this.albumResitory.findOneBy({ id });
  }

  async deleteAlbum(id: string): Promise<DeleteResult | null> {
    const albumToDelete = await this.albumResitory.findOneBy({ id });
    if (!albumToDelete) {
      return null;
    }
    return this.albumResitory.delete({ id });
  }
}
