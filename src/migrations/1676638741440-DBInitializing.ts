import { MigrationInterface, QueryRunner } from 'typeorm';
import {
  ALBUM_TABLE,
  ARTIST_TABLE,
  TRACK_TABLE,
  USER_TABLE,
} from './constants';

export class DBInitializing1676638741440 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(USER_TABLE, true, true);
    await queryRunner.createTable(ARTIST_TABLE, true, true);
    await queryRunner.createTable(ALBUM_TABLE, true, true);
    await queryRunner.createTable(TRACK_TABLE, true, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(USER_TABLE, true, true, true);
    await queryRunner.dropTable(TRACK_TABLE, true, true, true);
    await queryRunner.dropTable(ALBUM_TABLE, true, true, true);
    await queryRunner.dropTable(ARTIST_TABLE, true, true, true);
  }
}
