import { TableColumnOptions } from 'typeorm';

export const BASE_COLUMNS = [
  {
    name: 'id',
    type: 'uuid',
    isGenerated: true,
    generationStrategy: 'uuid',
    isPrimary: true,
    isNullable: false,
  },
  {
    name: 'createdAt',
    type: 'timestamp',
    default: 'now()',
    isNullable: false,
  },
  {
    name: 'updatedAt',
    type: 'timestamp',
    default: 'now()',
    isNullable: false,
  },
  { name: 'version', type: 'int' },
] as unknown as TableColumnOptions[];
