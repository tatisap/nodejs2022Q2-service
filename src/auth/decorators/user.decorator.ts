import { Request } from 'express';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUserType } from '../auth.type';

export const AuthUser = createParamDecorator(
  (_: unknown, context: ExecutionContext): AuthUserType => {
    const req: Request = context.switchToHttp().getRequest();
    return req.user;
  },
);
