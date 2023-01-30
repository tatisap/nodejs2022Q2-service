import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { User } from 'lib/entities';
import { db } from 'src/db';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserRepository {
  findMany(): User[] {
    return db.users;
  }

  findById(id: string): User | null {
    return db.users.find((user) => user.id === id);
  }

  findByLogin(login: string): User | null {
    return db.users.find((user) => user.login === login);
  }

  create(body: Omit<User, 'id'>): User {
    const plainUser = {
      id: uuid(),
      ...body,
    };
    const user = plainToInstance(User, plainUser);
    db.users.push(user);
    return user;
  }

  update(id: string, body: Partial<User>): User {
    const user = db.users.find((user) => user.id === id);
    Object.assign(user, body);
    return user;
  }

  delete(id: string): string {
    const userIndex = db.users.findIndex((user) => user.id === id);
    db.users.splice(userIndex, 1);
    return 'Deleted';
  }
}
