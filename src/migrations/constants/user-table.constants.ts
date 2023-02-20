import { Table } from 'typeorm';
import { BASE_COLUMNS } from './base-columns.constants';

export const USER_TABLE = new Table({
  name: 'user',
  columns: [
    {
      name: 'login',
      type: 'varchar',
      isUnique: true,
      isNullable: false,
    },
    {
      name: 'password',
      type: 'varchar',
      isNullable: false,
    },
    ...BASE_COLUMNS,
  ],
});
