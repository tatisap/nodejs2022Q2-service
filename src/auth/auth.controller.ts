import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { PublicUserDTO } from '../user';
import { LogInDTO, SignUpDTO, TokensDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { AuthUserType } from './auth.type';
import { AuthUser } from '../lib/decorators';
import { RefreshJwtAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() body: SignUpDTO): Promise<PublicUserDTO> {
    const user = await this.authService.signUp(body);
    return new PublicUserDTO(user);
  }

  @Post('login')
  @HttpCode(200)
  async logIn(@Body() body: LogInDTO): Promise<TokensDTO> {
    const response = await this.authService.logIn(body);
    return new TokensDTO(response);
  }

  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh')
  @HttpCode(200)
  async refresh(@AuthUser() payload: AuthUserType): Promise<TokensDTO> {
    const response = await this.authService.refreshTokens(payload.id);
    return new TokensDTO(response);
  }
}
