import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsUUID(4)
  artistId: string | null; // refers to Artist

  @IsOptional()
  @IsUUID()
  albumId: string | null; // refers to Album

  @IsInt()
  duration: number; // integer number
}

export class UpdateTrackDto extends PartialType(CreateTrackDto) {}
