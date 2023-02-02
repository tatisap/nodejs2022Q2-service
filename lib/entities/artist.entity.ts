import { Expose } from 'class-transformer';
import { BaseEntity } from './base.entity';

export class Artist extends BaseEntity {
  @Expose()
  name: string;

  @Expose()
  grammy: boolean;

  isFavorite: boolean;
}
