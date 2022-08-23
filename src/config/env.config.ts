export const EnvConfiguration = () => ({
  APP_ENVIROMENT: process.env.NODE_ENV || 'development',
  APP_PORT: +process.env.PORT,
  DB_DATABSE: process.env.DB_DATABASE,
  DB_HOST: process.env.DB_HOST,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_PORT: +process.env.DB_PORT,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_DEFAULT_LIMIT: +process.env.DB_DEFAULT_LIMIT,
  JWT_SECRET: process.env.JWT_SECRET,
  TYPEORM_ATTEMPTS: +process.env.TYPEORM_ATTEMPTS,
  TYPEORM_DELAY: +process.env.TYPEORM_DELAY,
  TYPEORM_SYNCHRONIZE: !!process.env.TYPEORM_SYNCHRONIZE,
});
