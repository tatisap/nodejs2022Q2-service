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
import { CreateTrackDto, PublicTrackDTO, UpdateTrackDto } from './track.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async getAllTracks(): Promise<PublicTrackDTO[]> {
    const tracks = await this.trackService.getAllTracks();
    return tracks.map((track) => new PublicTrackDTO(track));
  }

  @Get(':id')
  async getTrack(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<PublicTrackDTO> {
    const track = await this.trackService.getTrack(id);
    console.log(
      '🚀 ~ file: track.controller.ts:31 ~ TrackController ~ track ',
      track,
    );
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return new PublicTrackDTO(track);
  }

  @Post()
  async createTrack(@Body() body: CreateTrackDto): Promise<PublicTrackDTO> {
    const track = await this.trackService.createTrack(body);
    console.log(
      '🚀 ~ file: track.controller.ts:40 ~ TrackController ~ createTrack ~ track',
      track,
    );
    return new PublicTrackDTO(track);
  }

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

  @Delete(':id')
  @HttpCode(204)
  async deleteTrack(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const deleteResult = await this.trackService.deleteTrack(id);
    if (!deleteResult) {
      throw new NotFoundException('Track not found');
    }
  }
}
