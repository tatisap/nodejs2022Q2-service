import { Expose } from 'class-transformer';
import { PublicAlbumDTO } from 'src/album/album.dto';
import { PublicArtistDTO } from 'src/artist/artist.dto';
import { PublicTrackDTO } from 'src/track/track.dto';
import { BaseDTO } from 'src/utilities/base-dto';

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
