import { Expose } from 'class-transformer';
import { PublicAlbumDTO } from '../album';
import { PublicArtistDTO } from '../artist';
import { PublicTrackDTO } from '../track';
import { BaseDTO } from '../utilities';

export class GetAllFavoritesResponseDTO extends BaseDTO<GetAllFavoritesResponseDTO> {
  @Expose()
  artists: PublicArtistDTO[];

  @Expose()
  albums: PublicAlbumDTO[];

  @Expose()
  tracks: PublicTrackDTO[];
}

export class AddToFavoritesDTO {
  @Expose()
  message: string;
}
