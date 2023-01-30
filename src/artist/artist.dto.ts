import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}

export class UpdateArtistDto extends PartialType(CreateArtistDto) {}
