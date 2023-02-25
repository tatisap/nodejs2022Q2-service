import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { BaseDTO } from 'src/utilities/base-dto';

export class SignUpDTO {
  @IsString()
  login: string;

  @IsString()
  password: string;
}

export class LogInDTO extends SignUpDTO {}

export class RefreshDTO {
  @IsString()
  refreshToken: string;
}

export class StatusResponseDTO extends BaseDTO<StatusResponseDTO> {
  @Expose()
  message: string;
}

export class TokensDTO extends BaseDTO<TokensDTO> {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;
}
