import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';

const POSTRGRES_CONNECTION: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
};

export default POSTRGRES_CONNECTION;
