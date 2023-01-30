import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsString, IsUUID } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsInt()
  year: number;

  @IsUUID()
  artistId: string | null; // refers to Artist
}

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {}
