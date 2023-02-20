import { Expose, Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { BaseDTO } from 'src/utilities/base-dto';

export class CreateUserDTO {
  @IsString()
  login: string;

  @IsString()
  password: string;
}

export class UpdatePasswordDTO {
  @IsString()
  oldPassword: string;

  @IsString()
  newPassword: string;
}

export class PublicUserDTO extends BaseDTO<PublicUserDTO> {
  @Expose()
  id: string;

  @Expose()
  login: string;

  @Expose()
  version: number;

  @Type(() => Number)
  @Expose()
  createdAt: number;

  @Type(() => Number)
  @Expose()
  updatedAt: number;
}
