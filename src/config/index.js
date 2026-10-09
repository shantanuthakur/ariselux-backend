import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../../.env');

// Initial load
dotenv.config({ path: envPath });

export function getConfig() {
  // Environment variables supplied by the host must take precedence over the
  // local .env file in production deployments.
  dotenv.config({ path: envPath });

  const clientOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:3000,https://ariselux-frontend.sales3-a0c.workers.dev')
    .split(',')
    .map(origin => origin.trim().replace(/\/$/, ''))
    .filter(Boolean);

  return {
    port: parseInt(process.env.PORT, 10) || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    clientOrigin: clientOrigins[0],
    clientOrigins,
    adminApiKey: process.env.ADMIN_API_KEY || '',
    company: {
      name: 'Ariselux Equipments Private Limited',
      email: process.env.COMPANY_EMAIL || 'sales@ariselux.com',
      phone: process.env.COMPANY_PHONE || '+918126732502',
      address: 'Plot No. 25, Sector 8A, IIE SIDCUL, Roorkee - 249403, Uttarakhand, India',
      whatsapp: '918126732502'
    },
    smtp: {
      host: process.env.SMTP_HOST || '',
      port: parseInt(process.env.SMTP_PORT, 10) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
      fromEmail: process.env.FROM_EMAIL || process.env.SMTP_USER || 'sales@ariselux.com'
    }
  };
}

export const config = getConfig();
