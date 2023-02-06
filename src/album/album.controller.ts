import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Album } from 'lib/entities';
import { CreateAlbumDto, UpdateAlbumDto } from './album.dto';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAllAlbums(): Album[] {
    return this.albumService.getAllAlbums();
  }

  @Get(':id')
  getAlbum(@Param('id', ParseUUIDPipe) id: string): Album {
    const album = this.albumService.getAlbum(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  @Post()
  createAlbum(@Body() body: CreateAlbumDto): Album {
    return this.albumService.createAlbum(body);
  }

  @Put(':id')
  updateAlbum(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateAlbumDto,
  ): Album {
    const album = this.albumService.updateAlbum(id, body);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param('id', ParseUUIDPipe) id: string): void {
    const album = this.albumService.deleteAlbum(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
  }
}
