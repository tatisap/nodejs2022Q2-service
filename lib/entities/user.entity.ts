import { Expose } from 'class-transformer';

export class User {
  @Expose()
  id: string; // uuid v4

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
