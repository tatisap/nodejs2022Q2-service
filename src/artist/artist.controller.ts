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
import { Artist } from 'lib/entities';
import { CreateArtistDto, UpdateArtistDto } from './artist.dto';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getAllArtists(): Artist[] {
    return this.artistService.getAllArtists();
  }

  @Get(':id')
  getArtist(@Param('id', ParseUUIDPipe) id: string): Artist {
    const artist = this.artistService.getArtist(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  @Post()
  createArtist(@Body() body: CreateArtistDto): Artist {
    const artist = this.artistService.createArtist(body);
    return artist;
  }

  @Put(':id')
  updateArtist(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateArtistDto,
  ): Artist {
    const artist = this.artistService.updateArtist(id, body);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param('id', ParseUUIDPipe) id: string): void {
    const artist = this.artistService.deleteArtist(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
  }
}
