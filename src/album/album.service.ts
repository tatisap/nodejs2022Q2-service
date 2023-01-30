import { Injectable } from '@nestjs/common';
import { Album } from 'lib/entities';
import { CreateAlbumDto, UpdateAlbumDto } from './album.dto';
import { AlbumRepository } from './album.repository';

@Injectable()
export class AlbumService {
  constructor(private readonly albumResitory: AlbumRepository) {}
  getAllAlbums(): Album[] {
    return this.albumResitory.findMany();
  }

  getAlbum(id: string): Album | null {
    return this.albumResitory.findById(id);
  }

  createAlbum(body: CreateAlbumDto): Album {
    return this.albumResitory.create(body);
  }

  updateAlbum(id: string, body: UpdateAlbumDto): Album | null {
    const albumToUpdate = this.albumResitory.findById(id);
    if (!albumToUpdate) {
      return null;
    }
    return this.albumResitory.update(id, body);
  }

  deleteAlbum(id: string): string | null {
    const albumToDelete = this.albumResitory.findById(id);
    if (!albumToDelete) {
      return null;
    }
    this.albumResitory.delete(id);
  }
}
