import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';
import { IsAlbumExist, IsArtistExist } from 'lib/decorators';

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsUUID(4)
  @IsArtistExist({
    message: "artist doen't exist",
  })
  artistId: string | null = null; // refers to Artist

  @IsOptional()
  @IsUUID(4)
  @IsAlbumExist({
    message: "album doen't exist",
  })
  albumId: string | null = null; // refers to Album

  @IsInt()
  duration: number; // integer number
}

export class UpdateTrackDto extends CreateTrackDto {}
