import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';

@Injectable()
export class RefreshJwtAuthGuard extends AuthGuard('refresh-jwt') {
  handleRequest(_err: any, user: any, info: any) {
    if (info) {
      if (info.message === 'No auth token') {
        throw new UnauthorizedException('Refresh token is missing');
      }
      if (info instanceof TokenExpiredError) {
        throw new ForbiddenException('Token is expired');
      }
      if (info instanceof JsonWebTokenError) {
        throw new ForbiddenException('Token is invalid');
      }
    }
    return user;
  }
}
