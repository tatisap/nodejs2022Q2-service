import { registerDecorator, ValidationOptions } from 'class-validator';
import { Album, Artist, BaseEntity } from 'lib/entities';
import {
  AlbumRepository,
  ArtistRepository,
  Repository,
} from 'lib/repositories';

function IsEntityExist<T extends Repository<Entity>, Entity extends BaseEntity>(
  repository: T,
  decoratorName: string,
) {
  return (validationOptions: ValidationOptions) => {
    return (object: any, propertyName: string) => {
      registerDecorator({
        name: decoratorName,
        target: object.constructor,
        propertyName,
        options: validationOptions,
        validator: {
          validate(value: any) {
            return !!repository.findById(value);
          },
        },
      });
    };
  };
}

export const IsArtistExist = IsEntityExist<ArtistRepository, Artist>(
  new ArtistRepository(),
  'IsArtistExist',
);

export const IsAlbumExist = IsEntityExist<AlbumRepository, Album>(
  new AlbumRepository(),
  'IsAlbumExist',
);
