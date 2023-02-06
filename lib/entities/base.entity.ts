import { Expose } from 'class-transformer';

export class BaseEntity {
  @Expose()
  id: string; // uuid v4
}
