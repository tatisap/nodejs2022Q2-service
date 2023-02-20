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
import {
  CreateArtistDto,
  PublicArtistDTO,
  UpdateArtistDto,
} from './artist.dto';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async getAllArtists(): Promise<PublicArtistDTO[]> {
    const artists = await this.artistService.getAllArtists();
    return artists.map((artist) => new PublicArtistDTO(artist));
  }

  @Get(':id')
  async getArtist(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<PublicArtistDTO> {
    const artist = await this.artistService.getArtist(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return new PublicArtistDTO(artist);
  }

  @Post()
  async createArtist(@Body() body: CreateArtistDto): Promise<PublicArtistDTO> {
    const artist = await this.artistService.createArtist(body);
    return new PublicArtistDTO(artist);
  }

  @Put(':id')
  async updateArtist(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateArtistDto,
  ): Promise<PublicArtistDTO> {
    const artist = await this.artistService.updateArtist(id, body);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return new PublicArtistDTO(artist);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteArtist(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const deleteResult = await this.artistService.deleteArtist(id);
    if (!deleteResult) {
      throw new NotFoundException('Artist not found');
    }
  }
}
