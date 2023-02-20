import { Table } from 'typeorm';
import { BASE_COLUMNS } from './base-columns.constants';

export const ARTIST_TABLE = new Table({
  name: 'artist',
  columns: [
    {
      name: 'name',
      type: 'varchar',
      isNullable: false,
    },
    {
      name: 'grammy',
      type: 'boolean',
      isNullable: false,
    },
    {
      name: 'isFavorite',
      type: 'boolean',
      default: false,
    },
    ...BASE_COLUMNS,
  ],
});
