import { applyDecorators, UseGuards } from '@nestjs/common';
import { AccessJwtAuthGuard } from '../guards';

export const Auth = () => {
  return applyDecorators(UseGuards(AccessJwtAuthGuard));
};
