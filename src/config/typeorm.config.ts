import { DataSource, DataSourceOptions } from 'typeorm';
import POSTRGRES_CONNECTION from './postgres.connection';

const TypeOrmDataSource = new DataSource({
  ...(POSTRGRES_CONNECTION as DataSourceOptions),
  entities: ['*/**/*.entity.ts'],
  migrations: ['src/db/migrations/*.ts'],
});

TypeOrmDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default TypeOrmDataSource;
