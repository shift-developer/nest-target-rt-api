import * as Joi from '@hapi/joi';

export const JoiValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  DB_DATABASE: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_DEFAULT_LIMIT: Joi.number().default(50),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.number().default(3600),
  TYPEORM_ATTEMPTS: Joi.number().default(10),
  TYPEORM_DELAY: Joi.number().default(3000),
  TYPEORM_SYNCHRONIZE: Joi.boolean().default(false),
});
