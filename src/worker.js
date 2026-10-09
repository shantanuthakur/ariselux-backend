import { Container, getContainer } from '@cloudflare/containers';

export class AriseluxBackendContainer extends Container {
  defaultPort = 8080;
  sleepAfter = '10m';
  enableInternet = true;
  entrypoint = ['npm', 'start'];
  pingEndpoint = '/api/health';
}

export default {
  async fetch(request, env) {
    return getContainer(env.ARISELUX_BACKEND, 'production').fetch(request);
  }
};
