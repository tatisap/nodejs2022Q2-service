import { dbConfig } from '../config/db.config';
import { DataSource } from 'typeorm';
import 'dotenv/config';

export const dataSource = new DataSource(dbConfig().DATABASE);
