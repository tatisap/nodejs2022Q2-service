import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Auth } from '../auth';
import { CreateUserDTO, PublicUserDTO, UpdatePasswordDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @Get()
  async getAllUsers(): Promise<PublicUserDTO[]> {
    const users = await this.userService.getAllUsers();
    return users.map((user) => new PublicUserDTO(user));
  }

  @Auth()
  @Get(':id')
  async getUser(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<PublicUserDTO> {
    const user = await this.userService.getUser(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return new PublicUserDTO(user);
  }

  @Auth()
  @Post()
  async createUser(@Body() body: CreateUserDTO): Promise<PublicUserDTO> {
    const user = await this.userService.createUser(body);
    return new PublicUserDTO(user);
  }

  @Auth()
  @Put(':id')
  async updatePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdatePasswordDTO,
  ): Promise<PublicUserDTO> {
    const user = await this.userService.updatePassword(id, body);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return new PublicUserDTO(user);
  }

  @Auth()
  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const deleteResult = await this.userService.deleteUser(id);
    if (!deleteResult) {
      throw new NotFoundException('User not found');
    }
  }
}
