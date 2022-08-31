import * as Joi from '@hapi/joi';
import { NODE_ENV, APP_DEFAULTS, DB_DEFAULTS } from '@config/constants';

export const JoiValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .required()
    .valid(
      NODE_ENV.DEVELOPMENT,
      NODE_ENV.PRODUCTION,
      NODE_ENV.TEST,
      NODE_ENV.STAGING,
    ),
  PORT: Joi.number().default(APP_DEFAULTS.PORT),
  NAME: Joi.string().default(APP_DEFAULTS.NAME),
  PWD: Joi.string().optional(),
  API_PREFIX: Joi.string().default(APP_DEFAULTS.API_PREFIX),

  AUTH_JWT_SECRET: Joi.string().required(),
  AUTH_JWT_TOKEN_EXPIRES_IN: Joi.number().required(),

  DATABASE_URL: Joi.string().optional(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  DATABASE_PASSWORD: Joi.string().required().allow(''),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_SYNCHRONIZE: Joi.boolean().default(false),
  DATABASE_LOGGING: Joi.boolean().default(false),
  DATABASE_MAX_CONNECTIONS: Joi.number().default(DB_DEFAULTS.MAX_CONNECTIONS),
  DATABASE_MIGRATE: Joi.boolean().default(false),
  DATABASE_SSL_ENABLED: Joi.boolean().default(false),
  DATABASE_REJECT_UNAUTHORIZED: Joi.boolean().optional(),
  DATABASE_CA: Joi.string().optional(),
  DATABASE_KEY: Joi.string().optional(),
  DATABASE_CERT: Joi.string().optional(),
  DATABASE_LIMIT: Joi.string().default(DB_DEFAULTS.LIMIT),
});
