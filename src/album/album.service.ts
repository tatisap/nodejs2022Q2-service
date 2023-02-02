import { Injectable } from '@nestjs/common';
import { Album } from 'lib/entities';
import { Property } from 'lib/types';
import { TrackService } from 'src/track/track.service';
import { CreateAlbumDto } from './album.dto';
import { AlbumRepository } from './album.repository';

@Injectable()
export class AlbumService {
  constructor(
    private readonly albumResitory: AlbumRepository,
    private readonly trackService: TrackService,
  ) {}
  getAllAlbums(property?: Property<Album>): Album[] {
    return this.albumResitory.findMany(property);
  }

  getAlbum(id: string): Album | null {
    return this.albumResitory.findById(id);
  }

  createAlbum(body: CreateAlbumDto): Album {
    return this.albumResitory.create({ ...body, isFavorite: false });
  }

  updateAlbum(id: string, body: Partial<Album>): Album | null {
    const albumToUpdate = this.albumResitory.findById(id);
    if (!albumToUpdate) {
      return null;
    }
    return this.albumResitory.update(id, body);
  }

  deleteAlbum(id: string): Album | null {
    const albumToDelete = this.albumResitory.findById(id);
    if (!albumToDelete) {
      return null;
    }
    const [deletedAlbum] = this.albumResitory.delete(id);
    const tracks = this.trackService.getAllTracks({
      key: 'albumId',
      value: deletedAlbum.id,
    });

    tracks.forEach((track) =>
      this.trackService.updateTrack(track.id, { albumId: null }),
    );

    return deletedAlbum;
  }
}
