import { Expose } from 'class-transformer';
import { BaseEntity } from './base.entity';

export class Track extends BaseEntity {
  @Expose()
  name: string;

  @Expose()
  artistId: string | null; // refers to Artist

  @Expose()
  albumId: string | null; // refers to Album

  @Expose()
  duration: number; // integer number
}
