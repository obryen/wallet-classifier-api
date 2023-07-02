import { config } from 'dotenv';
config();
import databaseConfig from './database.config';
import loggingConfig from './logging.config';
import { ConfigDTO } from './dto/config.dto';

const CONFIG = {
  ENV: {
    IS_PRODUCTION: process.env.NODE_ENV === 'production',
  },
  APP: {
    NAME: process.env.APP_NAME,
    VERSION: process.env.APP_VERSION || '1.0',
    PORT: Number(process.env.APP_PORT) || 8000,
  },
  DATABASE: { ...databaseConfig },
  LOGGING: { ...loggingConfig },
} as ConfigDTO;

export default CONFIG;
