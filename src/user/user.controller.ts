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
import { CreateUserDTO, PublicUserDTO, UpdatePasswordDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<PublicUserDTO[]> {
    const users = await this.userService.getAllUsers();
    return users.map((user) => new PublicUserDTO(user));
  }

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

  @Post()
  async createUser(@Body() body: CreateUserDTO): Promise<PublicUserDTO> {
    const user = await this.userService.createUser(body);
    return new PublicUserDTO(user);
  }

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

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const deleteResult = await this.userService.deleteUser(id);
    if (!deleteResult) {
      throw new NotFoundException('User not found');
    }
  }
}
