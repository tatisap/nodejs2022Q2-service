import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavService } from './fav.service';

@Controller('favs')
export class FavController {
  constructor(private readonly favService: FavService) {}

  @Get()
  getAllFavorites() {}

  @Post('track/:id')
  addTrack(@Param('id', ParseUUIDPipe) id: string) {}

  @Delete('track/:id')
  deleteTrack(@Param('id', ParseUUIDPipe) id: string) {}

  @Post('album/:id')
  addAlbum(@Param('id', ParseUUIDPipe) id: string) {}

  @Delete('album/:id')
  deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {}

  @Post('artist/:id')
  addArtist(@Param('id', ParseUUIDPipe) id: string) {}

  @Delete('artist/:id')
  deleteArtist(@Param('id', ParseUUIDPipe) id: string) {}
}
