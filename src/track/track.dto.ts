import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsString, IsUUID } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsUUID(4)
  artistId: string | null; // refers to Artist

  @IsUUID()
  albumId: string | null; // refers to Album

  @IsInt()
  duration: number; // integer number
}

export class UpdateTrackDto extends PartialType(CreateTrackDto) {}
