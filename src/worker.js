import { Container, getContainer } from '@cloudflare/containers';

export class AriseluxBackendContainer extends Container {
  defaultPort = 8080;
  sleepAfter = '10m';
  enableInternet = true;
  entrypoint = ['npm', 'start'];
  pingEndpoint = '/api/health';

  constructor(ctx, env) {
    super(ctx, env);

    // A container does not automatically inherit the Worker environment.
    // Pass the runtime configuration explicitly so SMTP works in production.
    this.envVars = {
      NODE_ENV: env.NODE_ENV || 'production',
      PORT: '8080',
      CLIENT_ORIGIN: env.CLIENT_ORIGIN || 'https://ariselux-frontend.sales3-a0c.workers.dev',
      COMPANY_EMAIL: env.COMPANY_EMAIL || '',
      COMPANY_PHONE: env.COMPANY_PHONE || '',
      SMTP_HOST: env.SMTP_HOST || '',
      SMTP_PORT: String(env.SMTP_PORT || '587'),
      SMTP_SECURE: String(env.SMTP_SECURE || 'false'),
      SMTP_USER: env.SMTP_USER || '',
      SMTP_PASS: env.SMTP_PASS || '',
      FROM_EMAIL: env.FROM_EMAIL || ''
    };
  }
}

export default {
  async fetch(request, env) {
    return getContainer(env.ARISELUX_BACKEND, 'production').fetch(request);
  }
};
