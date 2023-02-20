import { Table } from 'typeorm';
import { BASE_COLUMNS } from './base-columns.constants';

export const TRACK_TABLE = new Table({
  name: 'track',
  columns: [
    {
      name: 'name',
      type: 'varchar',
      isNullable: false,
    },
    {
      name: 'duration',
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
    {
      name: 'albumId',
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
    {
      columnNames: ['albumId'],
      referencedTableName: 'album',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL',
    },
  ],
});
