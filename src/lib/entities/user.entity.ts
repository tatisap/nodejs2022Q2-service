import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('user')
export class User extends BaseEntity {
  @Column({ unique: true })
  login: string;

  @Column()
  password: string;
}
