import * as Joi from 'joi';

export const configSchema = Joi.object({
    NODE_ENV: Joi.string().required(),
    ACCESS_KEY: Joi.string().required(),
    ALCHEMY_API: Joi.string().required(),
    ALECHEMY_API: Joi.string().required(),
    APP_NAME: Joi.string().required(),
    APP_PORT: Joi.number().required(),
    APP_VERSION: Joi.string().required(),
    DATABASE_HOST: Joi.string().required(),
    DATABASE_PORT: Joi.number().required(),
    DATABASE_NAME: Joi.string().required(),
    DATABASE_USER: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
});
