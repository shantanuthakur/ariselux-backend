import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Log file path: backend/ariselux.log
const LOG_FILE = path.resolve(__dirname, '../../ariselux.log');

// Max log file size before rotation (5 MB)
const MAX_LOG_BYTES = 5 * 1024 * 1024;

/**
 * Returns current IST timestamp string
 */
function timestamp() {
  return new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).replace(',', '');
}

/**
 * Rotate log file if it exceeds MAX_LOG_BYTES.
 * Renames current log to ariselux.log.1 (overwrites old backup).
 */
function rotateIfNeeded() {
  try {
    if (fs.existsSync(LOG_FILE)) {
      const { size } = fs.statSync(LOG_FILE);
      if (size >= MAX_LOG_BYTES) {
        const backupPath = LOG_FILE + '.1';
        fs.renameSync(LOG_FILE, backupPath);
      }
    }
  } catch (_) {
    // Ignore rotation errors
  }
}

/**
 * Core write function — appends a single line to the log file.
 */
function writeLine(level, category, message, meta = null) {
  try {
    rotateIfNeeded();
    const metaPart = meta ? ` | ${JSON.stringify(meta)}` : '';
    const line = `[${timestamp()} IST] [${level}] [${category}] ${message}${metaPart}\n`;
    fs.appendFileSync(LOG_FILE, line, 'utf8');
  } catch (err) {
    // Silently ignore — never crash the server due to logging
    console.error('[LOG SERVICE ERROR]', err.message);
  }
}

// ── Public API ────────────────────────────────────────────────

/**
 * Log a new quotation request submission (RFQ)
 */
export function logQuotation(quotation, emailResults = {}) {
  writeLine('INFO', 'QUOTATION', `New commercial quotation (RFQ) received`, {
    id: quotation.id,
    name: quotation.name,
    company: quotation.company || 'Direct Buyer',
    gstin: quotation.gstin || 'N/A',
    product: quotation.product,
    quantity: quotation.quantity,
    timeline: quotation.deliveryTimeline,
    location: quotation.deliveryLocation || quotation.location || 'N/A',
    phone: quotation.phone,
    email: quotation.email || 'N/A',
    source: quotation.source,
    salesEmail: emailResults.salesDesk || 'N/A',
    customerEmail: emailResults.customerAck || 'N/A'
  });
}

/**
 * Log a new technical & factory enquiry submission
 */
export function logEnquiry(enquiry, emailResults = {}) {
  writeLine('INFO', 'ENQUIRY', `New technical enquiry received`, {
    id: enquiry.id,
    name: enquiry.name,
    enquiryType: enquiry.enquiryType,
    product: enquiry.product,
    projectType: enquiry.projectType || 'N/A',
    preferredChannel: enquiry.preferredChannel || 'WhatsApp',
    location: enquiry.location || 'N/A',
    phone: enquiry.phone,
    email: enquiry.email || 'N/A',
    source: enquiry.source,
    salesEmail: emailResults.salesDesk || 'N/A',
    customerEmail: emailResults.customerAck || 'N/A'
  });
}

/**
 * Log a general quotation / inquiry submission (fallback)
 */
export function logInquiry(inquiry, emailResults = {}) {
  if (inquiry.entryType === 'quotation' || inquiry.id?.startsWith('RFQ-')) {
    return logQuotation(inquiry, emailResults);
  }
  return logEnquiry(inquiry, emailResults);
}

/**
 * Log email delivery result
 */
export function logEmail(type, to, result) {
  const status = result.sent ? 'SENT' : 'FAILED';
  const detail = result.sent
    ? `messageId=${result.messageId}`
    : (result.error || result.reason || 'unknown');
  writeLine(result.sent ? 'INFO' : 'WARN', `EMAIL:${type}`, `${status} → ${to} | ${detail}`);
}

/**
 * Log rate limit hit
 */
export function logRateLimit(ip, product) {
  writeLine('WARN', 'RATE_LIMIT', `Too many requests from IP ${ip}`, { product });
}

/**
 * Log spam / honeypot trigger
 */
export function logSpam(ip) {
  writeLine('WARN', 'SPAM', `Honeypot triggered from IP ${ip}`);
}

/**
 * Log duplicate submission blocked
 */
export function logDedupe(key) {
  writeLine('INFO', 'DEDUPE', `Duplicate submission blocked`, { key });
}

/**
 * Log a general error
 */
export function logError(category, message, err) {
  writeLine('ERROR', category, message, {
    error: err?.message || String(err),
    stack: err?.stack?.split('\n')[1]?.trim() || undefined
  });
}

/**
 * Log server startup info
 */
export function logStartup(port, env) {
  writeLine('INFO', 'SERVER', `Ariselux backend started on port ${port} [${env}]`);
}

/**
 * Generic info log
 */
export function logInfo(category, message, meta = null) {
  writeLine('INFO', category, message, meta);
}
