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
import { PublicAlbumDTO } from 'src/album/album.dto';
import { PublicArtistDTO } from 'src/artist/artist.dto';
import { PublicTrackDTO } from 'src/track/track.dto';
import { AddToFavoritesDTO, GetAllFavoritesResponseDTO } from './fav.dto';
import { FavService } from './fav.service';

@Controller('favs')
export class FavController {
  constructor(private readonly favService: FavService) {}

  @Get()
  async getAllFavorites(): Promise<GetAllFavoritesResponseDTO> {
    const { artists, albums, tracks } = await this.favService.getAllFavorites();
    return new GetAllFavoritesResponseDTO({
      artists: artists.map((artist) => new PublicArtistDTO(artist)),
      albums: albums.map((album) => new PublicAlbumDTO(album)),
      tracks: tracks.map((track) => new PublicTrackDTO(track)),
    });
  }

  @Post('track/:id')
  async addTrack(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<AddToFavoritesDTO> {
    const favoriteTrack = await this.favService.changeTrackFavStatus(id, true);
    if (!favoriteTrack) {
      throw new UnprocessableEntityException('Track not found');
    }
    return { message: `Track (${id}) has been added to favorites` };
  }

  @Delete('track/:id')
  @HttpCode(204)
  async deleteTrack(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const track = await this.favService.changeTrackFavStatus(id, false);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
  }

  @Post('album/:id')
  async addAlbum(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<AddToFavoritesDTO> {
    const favoriteAlbum = await this.favService.changeAlbumFavStatus(id, true);
    if (!favoriteAlbum) {
      throw new UnprocessableEntityException('Album not found');
    }
    return { message: `Album (${id}) has been added to favorites` };
  }

  @Delete('album/:id')
  @HttpCode(204)
  async deleteAlbum(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const album = await this.favService.changeAlbumFavStatus(id, false);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
  }

  @Post('artist/:id')
  async addArtist(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<AddToFavoritesDTO> {
    const favoriteArtist = await this.favService.changeArtistFavStatus(
      id,
      true,
    );
    if (!favoriteArtist) {
      throw new UnprocessableEntityException('Artist not found');
    }
    return { message: `Artist (${id}) has been added to favorites` };
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async deleteArtist(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const artist = await this.favService.changeArtistFavStatus(id, false);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
  }
}
