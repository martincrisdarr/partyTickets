import { config } from 'dotenv';
config();
const env = process.env;
export default {
  tokenExpiry: 6.048e8,
  secretKey: env.SECRET_KEY || '',
  publicHost: env.PUBLIC_URL || '',
  mongoHost: env.MONGO_HOST || '127.0.0.1',
  mongoUser: env.MONGO_USER || '',
  mongoPassword: env.MONGO_PASSWORD || '',
  mongoDbName: env.MONGO_DB_NAME || 'ticketsParty',
  loggerName: env.APP_ID || 'api',
  loggerLevel: env.LOG_LEVEL || 'debug',
  applicationPort: env.PORT || '8080',
  adminId: env.ADMIN_ID || '',
};
