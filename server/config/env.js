import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure .env is loaded from the server directory
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const NODE_ENV = process.env.NODE_ENV || 'development';

// Validate critical secrets
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  if (NODE_ENV === 'production') {
    throw new Error('FATAL SECURITY ERROR: JWT_SECRET must be defined in production environment!');
  } else {
    console.warn('⚠️ [SECURITY WARNING] JWT_SECRET is not set in .env. Using temporary session secret for development.');
  }
}

export const env = {
  NODE_ENV,
  PORT: parseInt(process.env.PORT || '5000', 10),
  MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio_db',
  JWT_SECRET: JWT_SECRET || 'dev_session_ephemeral_jwt_secret_must_change_in_prod',
  ADMIN_SECRET_KEY: process.env.ADMIN_SECRET_KEY || '',
  ADMIN_USERNAME: process.env.ADMIN_USERNAME || 'admin',
  ADMIN_EMAIL: (process.env.ADMIN_EMAIL || 'admin@portfolio.com').toLowerCase(),
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
};
