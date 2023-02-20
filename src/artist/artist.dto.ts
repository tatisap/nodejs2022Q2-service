import { Expose } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';
import { BaseDTO } from 'src/utilities/base-dto';

export class CreateArtistDto {
  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}

export class UpdateArtistDto extends CreateArtistDto {}

export class PublicArtistDTO extends BaseDTO<PublicArtistDTO> {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  grammy: boolean;
}
