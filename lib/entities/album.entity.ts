import { Expose } from 'class-transformer';
import { BaseEntity } from './base.entity';

export class Album extends BaseEntity {
  @Expose()
  name: string;

  @Expose()
  year: number;

  @Expose()
  artistId: string | null; // refers to Artist
}
