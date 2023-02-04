import { Injectable } from '@nestjs/common';
import { Artist } from 'lib/entities';
import { Property } from 'lib/types';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { CreateArtistDto } from './artist.dto';
import { ArtistRepository } from '../../lib/repositories';

@Injectable()
export class ArtistService {
  constructor(
    private readonly artistRepository: ArtistRepository,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
  ) {}
  getAllArtists(property?: Property<Artist>): Artist[] {
    return this.artistRepository.findMany(property);
  }

  getArtist(id: string): Artist | null {
    return this.artistRepository.findById(id);
  }

  createArtist(body: CreateArtistDto): Artist {
    return this.artistRepository.create({ ...body, isFavorite: false });
  }

  updateArtist(id: string, body: Partial<Artist>): Artist | null {
    const artistToUpdate = this.artistRepository.findById(id);
    if (!artistToUpdate) {
      return null;
    }
    return this.artistRepository.update(id, body);
  }

  deleteArtist(id: string): Artist | null {
    const artistToDelete = this.artistRepository.findById(id);
    if (!artistToDelete) {
      return null;
    }
    const [deletedArtist] = this.artistRepository.delete(id);

    const tracks = this.trackService.getAllTracks({
      key: 'artistId',
      value: deletedArtist.id,
    });
    tracks.forEach((track) =>
      this.trackService.updateTrack(track.id, { artistId: null }),
    );

    const albums = this.albumService.getAllAlbums({
      key: 'artistId',
      value: deletedArtist.id,
    });
    albums.forEach((album) =>
      this.albumService.updateAlbum(album.id, { artistId: null }),
    );

    return deletedArtist;
  }
}
