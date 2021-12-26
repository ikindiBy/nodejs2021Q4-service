import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

export const PORT = process.env.PORT || 4000;
export const {NODE_ENV} = process.env;
export const POMONGO_CONNECTION_STRINGRT = process.env.MONGO_CONNECTION_STRING;
export const {JWT_SECRET_KEY} = process.env;
export const AUTH_MODE = process.env.AUTH_MODE === 'true';
