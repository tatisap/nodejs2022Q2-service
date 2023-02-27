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
import { Auth } from '../lib/decorators';
import { CreateAlbumDto, PublicAlbumDTO, UpdateAlbumDto } from './album.dto';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Auth()
  @Get()
  async getAllAlbums(): Promise<PublicAlbumDTO[]> {
    const albums = await this.albumService.getAllAlbums();
    return albums.map((album) => new PublicAlbumDTO(album));
  }

  @Auth()
  @Get(':id')
  async getAlbum(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<PublicAlbumDTO> {
    const album = await this.albumService.getAlbum(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return new PublicAlbumDTO(album);
  }

  @Auth()
  @Post()
  async createAlbum(@Body() body: CreateAlbumDto): Promise<PublicAlbumDTO> {
    const album = await this.albumService.createAlbum(body);
    return new PublicAlbumDTO(album);
  }

  @Auth()
  @Put(':id')
  async updateAlbum(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateAlbumDto,
  ): Promise<PublicAlbumDTO> {
    const album = await this.albumService.updateAlbum(id, body);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return new PublicAlbumDTO(album);
  }

  @Auth()
  @Delete(':id')
  @HttpCode(204)
  async deleteAlbum(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const deleteResult = await this.albumService.deleteAlbum(id);
    if (!deleteResult) {
      throw new NotFoundException('Album not found');
    }
  }
}
