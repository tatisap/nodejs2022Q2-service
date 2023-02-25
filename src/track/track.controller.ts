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
import { CreateTrackDto, PublicTrackDTO, UpdateTrackDto } from './track.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Auth()
  @Get()
  async getAllTracks(): Promise<PublicTrackDTO[]> {
    const tracks = await this.trackService.getAllTracks();
    return tracks.map((track) => new PublicTrackDTO(track));
  }

  @Auth()
  @Get(':id')
  async getTrack(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<PublicTrackDTO> {
    const track = await this.trackService.getTrack(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return new PublicTrackDTO(track);
  }

  @Auth()
  @Post()
  async createTrack(@Body() body: CreateTrackDto): Promise<PublicTrackDTO> {
    const track = await this.trackService.createTrack(body);
    return new PublicTrackDTO(track);
  }

  @Auth()
  @Put(':id')
  async updateTrack(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateTrackDto,
  ): Promise<PublicTrackDTO> {
    const track = await this.trackService.updateTrack(id, body);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return new PublicTrackDTO(track);
  }

  @Auth()
  @Delete(':id')
  @HttpCode(204)
  async deleteTrack(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const deleteResult = await this.trackService.deleteTrack(id);
    if (!deleteResult) {
      throw new NotFoundException('Track not found');
    }
  }
}
