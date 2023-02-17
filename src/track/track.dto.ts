import { Expose } from 'class-transformer';
import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';
import { BaseDTO } from 'src/utilities/base-dto';

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsInt()
  duration: number; // integer number

  @IsOptional()
  @IsUUID(4)
  artistId: string | null = null; // refers to Artist

  @IsOptional()
  @IsUUID(4)
  albumId: string | null = null; // refers to Album
}

export class UpdateTrackDto extends CreateTrackDto {}

export class PublicTrackDTO extends BaseDTO<PublicTrackDTO> {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  duration: number;

  @Expose()
  artistId: string | null;

  @Expose()
  albumId: string | null;
}
