import { Expose } from 'class-transformer';
import { Album, Artist, Track } from 'lib/entities';

export class GetAllFavoritesResponseDTO {
  @Expose()
  artists: Artist[];

  @Expose()
  albums: Album[];

  @Expose()
  tracks: Track[];
}
