import { Expose } from 'class-transformer';
import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';
import { BaseDTO } from 'src/utilities/base-dto';

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsInt()
  year: number;

  @IsOptional()
  @IsUUID()
  artistId: string | null = null;
}

export class UpdateAlbumDto extends CreateAlbumDto {}

export class PublicAlbumDTO extends BaseDTO<PublicAlbumDTO> {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  year: number;

  @Expose()
  artistId: string | null;
}
