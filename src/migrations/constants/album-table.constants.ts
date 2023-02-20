import { Table } from 'typeorm';
import { BASE_COLUMNS } from './base-columns.constants';

export const ALBUM_TABLE = new Table({
  name: 'album',
  columns: [
    {
      name: 'name',
      type: 'varchar',
      isNullable: false,
    },
    {
      name: 'year',
      type: 'int',
      isNullable: false,
    },
    {
      name: 'isFavorite',
      type: 'boolean',
      default: false,
    },
    {
      name: 'artistId',
      type: 'uuid',
      isNullable: true,
    },
    ...BASE_COLUMNS,
  ],
  foreignKeys: [
    {
      columnNames: ['artistId'],
      referencedTableName: 'artist',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL',
    },
  ],
});
