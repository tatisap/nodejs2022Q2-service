import * as bcrypt from 'bcrypt';
import {
  ForbiddenException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { User } from 'lib/entities';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';
import { UserRepository } from './user.repository';
import { Property } from 'lib/types';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  getAllUsers(property?: Property<User>): User[] {
    return this.userRepository.findMany(property);
  }

  getUser(id: string): User | null {
    return this.userRepository.findById(id);
  }

  async createUser({ login, password }: CreateUserDto): Promise<User> {
    const conflict = this.userRepository.findByLogin(login);
    if (conflict) {
      throw new UnprocessableEntityException('Login already taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const today = Date.now();
    return this.userRepository.create({
      login,
      password: hashedPassword,
      version: 1,
      createdAt: today,
      updatedAt: today,
    });
  }

  async updatePassword(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ): Promise<User | null> {
    const userToUpdate = this.userRepository.findById(id);
    if (!userToUpdate) {
      return null;
    }
    const isPasswordCorrect = await bcrypt.compare(
      oldPassword,
      userToUpdate.password,
    );

    if (!isPasswordCorrect) {
      throw new ForbiddenException('Password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return this.userRepository.update(id, {
      password: hashedPassword,
      version: userToUpdate.version + 1,
      updatedAt: Date.now(),
    });
  }

  deleteUser(id: string): [User] | null {
    const userToDelete = this.userRepository.findById(id);
    if (!userToDelete) {
      return null;
    }
    return this.userRepository.delete(id);
  }
}
