import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';
import { IsArtistExist } from 'lib/decorators';

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsInt()
  year: number;

  @IsOptional()
  @IsUUID()
  @IsArtistExist({
    message: "artist doesn't exist",
  })
  artistId: string | null = null; // refers to Artist
}

export class UpdateAlbumDto extends CreateAlbumDto {}
