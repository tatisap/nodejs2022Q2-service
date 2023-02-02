import {
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';
import { GetAllFavoritesResponseDTO } from './fav.dto';

@Controller('favs')
export class FavController {
  constructor(
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
  ) {}

  @Get()
  getAllFavorites(): GetAllFavoritesResponseDTO {
    return {
      artists: this.artistService.getAllArtists({
        key: 'isFavorite',
        value: true,
      }),
      albums: this.albumService.getAllAlbums({
        key: 'isFavorite',
        value: true,
      }),
      tracks: this.trackService.getAllTracks({
        key: 'isFavorite',
        value: true,
      }),
    };
  }

  @Post('track/:id')
  addTrack(@Param('id', ParseUUIDPipe) id: string) {
    const favoriteTrack = this.trackService.updateTrack(id, {
      isFavorite: true,
    });
    if (!favoriteTrack) {
      throw new UnprocessableEntityException('Track not found');
    }
    return 'Created';
  }

  @Delete('track/:id')
  @HttpCode(204)
  deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    const track = this.trackService.getTrack(id);
    if (!track || !track.isFavorite) {
      throw new NotFoundException('Track not found');
    }
    this.trackService.updateTrack(id, {
      isFavorite: false,
    });
  }

  @Post('album/:id')
  addAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const favoriteAlbum = this.albumService.updateAlbum(id, {
      isFavorite: true,
    });
    if (!favoriteAlbum) {
      throw new UnprocessableEntityException('Album not found');
    }
    return 'Created';
  }

  @Delete('album/:id')
  @HttpCode(204)
  deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const album = this.albumService.getAlbum(id);
    if (!album || !album.isFavorite) {
      throw new NotFoundException('Album not found');
    }
    this.albumService.updateAlbum(id, {
      isFavorite: false,
    });
  }

  @Post('artist/:id')
  addArtist(@Param('id', ParseUUIDPipe) id: string) {
    const favoriteArtist = this.artistService.updateArtist(id, {
      isFavorite: true,
    });
    if (!favoriteArtist) {
      throw new UnprocessableEntityException('Artist not found');
    }
    return 'Created';
  }

  @Delete('artist/:id')
  @HttpCode(204)
  deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    const artist = this.artistService.getArtist(id);
    if (!artist || !artist.isFavorite) {
      throw new NotFoundException('Artist not found');
    }
    this.artistService.updateArtist(id, {
      isFavorite: false,
    });
  }
}
