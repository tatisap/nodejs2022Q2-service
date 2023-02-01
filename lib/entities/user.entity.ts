import { Expose } from 'class-transformer';
import { BaseEntity } from './base.entity';

export class User extends BaseEntity {
  @Expose()
  login: string;

  password: string;

  @Expose()
  version: number; // integer number, increments on update

  @Expose()
  createdAt: number; // timestamp of creation

  @Expose()
  updatedAt: number;
}
