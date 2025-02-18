// src/data-source.ts
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Environment } from '@repo/ui/enums/environment';
import { readFileSync } from 'fs';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '..', '..', '..', '..', '.env') });

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: process.env.NODE_ENV == Environment.Local,
  logging: process.env.NODE_ENV == Environment.Local,
  logger: 'debug',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  ssl: {
    rejectUnauthorized: true,
    ca: readFileSync(resolve(__dirname, '..', '..', 'ap-south-1-bundle.pem')),
  },
});

export default AppDataSource;
