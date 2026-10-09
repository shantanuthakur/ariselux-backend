import { config } from '../config/index.js';

/** Protect private lead-management endpoints from public access. */
export function requireAdmin(req, res, next) {
  if (!config.adminApiKey) {
    return res.status(503).json({
      success: false,
      message: 'Admin API is not configured.'
    });
  }

  const authorization = req.get('authorization') || '';
  const bearerToken = authorization.startsWith('Bearer ')
    ? authorization.slice(7).trim()
    : '';
  const suppliedKey = req.get('x-admin-key') || bearerToken;

  if (suppliedKey !== config.adminApiKey) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized.'
    });
  }

  return next();
}
