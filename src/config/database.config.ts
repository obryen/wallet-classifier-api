import { DatabaseConfigDTO } from "./dto/config.dto";

export default {
  HOST: process.env.DATABASE_HOST,
  PORT: Number(process.env.DATABASE_PORT),
  USER: process.env.DATABASE_USER,
  PASSWORD: process.env.DATABASE_PASSWORD,
  NAME: process.env.DATABASE_NAME,
} as DatabaseConfigDTO;
