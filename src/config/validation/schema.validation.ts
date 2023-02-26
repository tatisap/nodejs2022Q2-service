import * as Joi from 'joi';

export const configSchema = Joi.object().keys({
  APP_PORT: Joi.number().port().required(),
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().port().required(),
  POSTGRES_USERNAME: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DATABASE: Joi.string().required(),
  LOG_LEVEL: Joi.number().integer().min(0).max(4).required(),
  MAX_LOG_FILE_SIZE: Joi.number().integer().min(1).required(),
  JWT_SECRET_KEY: Joi.string().required(),
  JWT_SECRET_REFRESH_KEY: Joi.string().required(),
  TOKEN_EXPIRE_TIME: Joi.string().required(),
  TOKEN_REFRESH_EXPIRE_TIME: Joi.string().required(),
  CRYPT_SALT: Joi.number().integer().required(),
});
