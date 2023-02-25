import * as bcrypt from 'bcrypt';
import {
  ForbiddenException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserService } from '../user';
import { LogInDTO, SignUpDTO, TokensDTO } from './auth.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthUserType } from './auth.type';
import { User } from '../lib/entities';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async signUp({ login, password }: SignUpDTO): Promise<User> {
    const conflict = await this.userService.getUserByLogin(login);
    if (conflict) {
      throw new UnprocessableEntityException('Login already taken');
    }
    return this.userService.createUser({ login, password });
  }

  async logIn({ login, password }: LogInDTO): Promise<TokensDTO> {
    const user = await this.userService.getUserByLogin(login);
    if (!user) {
      throw new ForbiddenException('Incorrect login');
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new ForbiddenException('Incorrect password');
    }
    const { id } = user;
    return this.getTokens({ id, login });
  }

  async getTokens({ id, login }: AuthUserType): Promise<TokensDTO> {
    const accessToken = await this.jwtService.signAsync(
      { user: { id, login } },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('TOKEN_EXPIRE_TIME'),
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      { user: { id, login } },
      {
        secret: this.configService.get('JWT_SECRET_REFRESH'),
        expiresIn: this.configService.get('TOKEN_REFRESH_EXPIRE_TIME'),
      },
    );
    return { accessToken, refreshToken };
  }
}
