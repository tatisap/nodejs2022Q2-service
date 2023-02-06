import { Injectable } from '@nestjs/common';
import { User } from 'lib/entities';
import { Repository } from 'lib/repositories';
import { db } from 'src/db';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor() {
    super();
    this.db = db.users;
    this.entity = User;
  }

  findByLogin(login: string): User | null {
    return db.users.find((user) => user.login === login);
  }
}
