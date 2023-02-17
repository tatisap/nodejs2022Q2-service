import * as bcrypt from 'bcrypt';
import {
  ForbiddenException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { User } from '../lib/entities';
import { CreateUserDTO, UpdatePasswordDTO } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  getUser(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  async createUser({ login, password }: CreateUserDTO): Promise<User> {
    const conflict = await this.userRepository.findOneBy({ login });
    if (conflict) {
      throw new UnprocessableEntityException('Login already taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      login,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  async updatePassword(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDTO,
  ): Promise<User | null> {
    const userToUpdate = await this.userRepository.findOneBy({ id });
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
    await this.userRepository.update({ id }, { password: hashedPassword });
    return this.userRepository.findOneBy({ id });
  }

  async deleteUser(id: string): Promise<DeleteResult | null> {
    const userToDelete = await this.userRepository.findOneBy({ id });
    if (!userToDelete) {
      return null;
    }
    return this.userRepository.delete(id);
  }
}
