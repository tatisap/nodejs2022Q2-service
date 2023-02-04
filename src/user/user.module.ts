import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from '../../lib/repositories';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
