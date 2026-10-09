import app from './app.js';
import { config } from './config/index.js';
import { logStartup } from './services/logService.js';

const PORT = config.port;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n======================================================`);
  console.log(`🚀 Ariselux Backend Server Running on port ${PORT}`);
  console.log(`📡 Environment: ${config.nodeEnv}`);
  console.log(`🔗 API Base: http://localhost:${PORT}/api`);
  console.log(`🩺 Health:   http://localhost:${PORT}/api/health`);
  console.log(`📨 Inquiries: http://localhost:${PORT}/api/inquiries`);
  console.log(`📦 Products:  http://localhost:${PORT}/api/products`);
  console.log(`======================================================\n`);
  logStartup(PORT, config.nodeEnv);
});

// Configure keep-alive timeouts to prevent ECONNRESET with reverse proxies
server.keepAliveTimeout = 65000;
server.headersTimeout = 66000;

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
