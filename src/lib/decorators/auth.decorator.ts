import { applyDecorators, UseGuards } from '@nestjs/common';
import { AccessJwtAuthGuard } from '../../auth/guards';

export const Auth = () => {
  return applyDecorators(UseGuards(AccessJwtAuthGuard));
};
