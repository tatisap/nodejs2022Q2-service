import * as bcrypt from 'bcryptjs';
import {
  ForbiddenException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../lib/entities';
import { CreateUserDTO, UpdatePasswordDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}
  getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  getUser(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  getUserByLogin(login: string): Promise<User | null> {
    return this.userRepository.findOneBy({ login });
  }

  async createUser({ login, password }: CreateUserDTO): Promise<User> {
    const conflict = await this.userRepository.findOneBy({ login });
    if (conflict) {
      throw new UnprocessableEntityException('Login already taken');
    }
    const hashedPassword = await bcrypt.hash(
      password,
      this.configService.get('CRYPT_SALT'),
    );
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
