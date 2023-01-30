import { Expose } from 'class-transformer';

export class Album {
  @Expose()
  id: string; // uuid v4

  @Expose()
  name: string;

  @Expose()
  year: number;

  @Expose()
  artistId: string | null; // refers to Artist
}
