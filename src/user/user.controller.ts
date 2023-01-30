import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { User } from 'lib/entities';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(): User[] {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUser(@Param('id', ParseUUIDPipe) id: string): User {
    const user = this.userService.getUser(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.createUser(body);
  }

  @Put(':id')
  async updatePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.userService.updatePassword(id, body);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) id: string): void {
    const user = this.userService.deleteUser(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
  }
}
