import { config } from 'dotenv';
config();

import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],  // Adjust if necessary
  migrations: [__dirname + './../migrations/**/*{.ts,.js}'],  // Adjust if necessary
  synchronize: false,
  logging: true,
};
console.log('__dirname', __dirname + './migrations/**/*{.ts,.js}');

const dataSource = new DataSource(dataSourceOptions);

dataSource
  .initialize()
  .then(() => {
    console.log('Database connection established successfully');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

export default dataSource;
