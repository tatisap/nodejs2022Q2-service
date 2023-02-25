import { Expose } from 'class-transformer';
import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';
import { BaseDTO } from '../utilities';

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsInt()
  duration: number;

  @IsOptional()
  @IsUUID(4)
  artistId: string | null = null;

  @IsOptional()
  @IsUUID(4)
  albumId: string | null = null;
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
