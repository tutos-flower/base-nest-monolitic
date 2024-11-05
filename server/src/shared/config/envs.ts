import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  JWT_ACCESS_TOKEN_SECRET: string;
  JWT_REFRESH_TOKEN_SECRET: string;
  JWT_ACCESS_TOKEN_EXPIRATION_TIME: number;
  REDIS_HOST: string;
  REDIS_PORT: number;
  DATABASE_PORT: number;
  DATABASE_HOST: string;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    REDIS_PORT: joi.number().required(),
    DATABASE_PORT: joi.number().required(),
    REDIS_HOST: joi.string().required(),
    DATABASE_HOST: joi.string().required(),
    DATABASE_USERNAME: joi.string().required(),
    DATABASE_PASSWORD: joi.string().required(),
    DATABASE_NAME: joi.string().required(),
    JWT_ACCESS_TOKEN_SECRET: joi.string().required(),
    JWT_REFRESH_TOKEN_SECRET: joi.string().required(),
    JWT_ACCESS_TOKEN_EXPIRATION_TIME: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  PORT: envVars.PORT,
  JWT_REFRESH_TOKEN_SECRET: envVars.JWT_REFRESH_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_SECRET: envVars.JWT_ACCESS_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRATION_TIME: envVars.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  REDIS_HOST: envVars.REDIS_HOST,
  REDIS_PORT: envVars.REDIS_PORT,
  DATABASE_PORT: envVars.DATABASE_PORT,
  DATABASE_HOST: envVars.DATABASE_HOST,
  DATABASE_USERNAME: envVars.DATABASE_USERNAME,
  DATABASE_PASSWORD: envVars.DATABASE_PASSWORD,
  DATABASE_NAME: envVars.DATABASE_NAME,
};
