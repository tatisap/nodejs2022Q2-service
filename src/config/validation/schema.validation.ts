import * as Joi from 'joi';

export const configSchema = Joi.object().keys({
  APP_PORT: Joi.number().port().required(),
});
