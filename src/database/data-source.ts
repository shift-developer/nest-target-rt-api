import { DataSource, DataSourceOptions } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  logging: process.env.DATABASE_LOGGING === 'true',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  migrationsTableName: 'typeorm_migrations_history',
  extra: {
    ssl:
      process.env.DATABASE_SSL_ENABLED === 'true'
        ? {
            rejectUnauthorized:
              process.env.DATABASE_REJECT_UNAUTHORIZED === 'true',
            ca: process.env.DATABASE_CA ?? undefined,
            key: process.env.DATABASE_KEY ?? undefined,
            cert: process.env.DATABASE_CERT ?? undefined,
          }
        : undefined,
  },
} as DataSourceOptions);
