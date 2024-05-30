import { Client } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

export const createDBClient = (): Client => {
  return new Client({
    user: process.env.DB_USER_NAME,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5432"),
  });
};
