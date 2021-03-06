import dotenv from 'dotenv';
import path from 'path';
import { logLevels } from './logStatuses';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

export const PORT = process.env.PORT || 4000;
export const {NODE_ENV} = process.env;
export const POMONGO_CONNECTION_STRINGRT = process.env.MONGO_CONNECTION_STRING;
export const {JWT_SECRET_KEY} = process.env;
export const AUTH_MODE = process.env.AUTH_MODE === 'true';
const logStatus = process.env.LOG_STATUS as keyof typeof logLevels || '4';
export const LOG_STATUS = logLevels[logStatus];
