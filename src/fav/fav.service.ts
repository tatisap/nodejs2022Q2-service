import { Injectable } from '@nestjs/common';
import { Album, Artist, Track } from '../lib/entities';
import { AlbumService } from '../album';
import { ArtistService } from '../artist';
import { TrackService } from '../track';

@Injectable()
export class FavService {
  constructor(
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
  ) {}

  async getAllFavorites(): Promise<{
    artists: Artist[];
    albums: Album[];
    tracks: Track[];
  }> {
    return {
      artists: await this.artistService.getAllArtists({ isFavorite: true }),
      albums: await this.albumService.getAllAlbums({ isFavorite: true }),
      tracks: await this.trackService.getAllTracks({ isFavorite: true }),
    };
  }

  changeTrackFavStatus(id: string, isFavorite: boolean): Promise<Track | null> {
    return this.trackService.updateTrack(id, { isFavorite });
  }

  changeAlbumFavStatus(id: string, isFavorite: boolean): Promise<Album | null> {
    return this.albumService.updateAlbum(id, { isFavorite });
  }

  changeArtistFavStatus(id: string, isFavorite: boolean) {
    return this.artistService.updateArtist(id, { isFavorite });
  }
}
