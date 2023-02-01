import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsInt()
  year: number;

  @IsOptional()
  @IsUUID()
  artistId: string | null; // refers to Artist
}

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {}
