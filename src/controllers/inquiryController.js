import { 
  saveQuotation, 
  getQuotations, 
  getQuotationById, 
  updateQuotationStatus,
  saveEnquiry, 
  getEnquiries, 
  getEnquiryById, 
  updateEnquiryStatus,
  saveInquiry, 
  getInquiries, 
  getInquiryById, 
  updateInquiryStatus 
} from '../services/storageService.js';
import { 
  sendQuotationNotification, 
  sendCustomerQuotationAcknowledgment, 
  sendEnquiryNotification, 
  sendCustomerEnquiryAcknowledgment 
} from '../services/emailService.js';
import { config } from '../config/index.js';
import { 
  logQuotation, 
  logEnquiry, 
  logInquiry, 
  logEmail, 
  logRateLimit, 
  logSpam, 
  logDedupe, 
  logError 
} from '../services/logService.js';

// Simple in-memory rate limiting map (IP -> timestamps)
const submissionRateMap = new Map();

// In-memory deduplication map (key -> { timestamp, response })
const recentSubmissionsMap = new Map();

function asText(value) {
  if (value === undefined || value === null) return '';
  return String(value).trim();
}

function normalizeBody(body = {}) {
  // Accept the current JSON contract and the field names used by the legacy
  // Contact Form 7 page copied into ref_page.html.
  const input = body && typeof body === 'object' && !Array.isArray(body) ? body : {};
  return {
    ...input,
    name: asText(input.name || input.c_name),
    email: asText(input.email || input.c_email),
    phone: asText(input.phone || input.c_number),
    company: asText(input.company || input.c_company),
    location: asText(input.location || input.c_location),
    message: asText(input.message || input.c_message),
    source: asText(input.source),
  };
}

function checkRateLimit(req, type = 'request') {
  const clientIp = req.ip || req.connection?.remoteAddress || 'unknown';
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const history = submissionRateMap.get(clientIp) || [];
  const validHistory = history.filter(ts => now - ts < windowMs);
  
  if (validHistory.length >= 8) {
    logRateLimit(clientIp, req.body?.product || 'unknown');
    return false;
  }
  validHistory.push(now);
  submissionRateMap.set(clientIp, validHistory);
  return true;
}

// ── 1. DEDICATED COMMERCIAL QUOTATION CONTROLLER ─────────────
export async function createQuotation(req, res, next) {
  try {
    req.body = normalizeBody(req.body);
    const { 
      name, email, phone, company, gstin, product, quantity, 
      deliveryTimeline, deliveryLocation, location, specifications, message, 
      source, website_hp, _gotcha 
    } = req.body;

    // Honeypot spam check
    if (website_hp || _gotcha) {
      console.warn(`[SPAM DETECTED] Honeypot triggered from IP: ${req.ip}`);
      logSpam(req.ip);
      return res.status(200).json({
        success: true,
        entryType: 'quotation',
        message: 'Quotation request received.'
      });
    }

    if (!checkRateLimit(req, 'quotation')) {
      return res.status(429).json({
        success: false,
        message: 'Too many quotation requests submitted. Please connect directly via WhatsApp at +91-8126732502.'
      });
    }

    // Required fields for Quotation
    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Full Name and Contact Phone / WhatsApp number are required for quotation.'
      });
    }

    const cleanPhone = phone.replace(/[^0-9+]/g, '');
    if (cleanPhone.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid contact phone number.'
      });
    }

    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanProduct = (product || 'Ariselux Light Tower').trim();
    const cleanQuantity = (quantity || '1 Unit').trim();
    const cleanLocation = (deliveryLocation || location || '').trim();

    // Deduplication check: 60-second window
    const now = Date.now();
    const dedupeKey = `quote_${cleanPhone}_${cleanEmail}_${cleanProduct.toLowerCase()}`;
    if (recentSubmissionsMap.has(dedupeKey)) {
      const existing = recentSubmissionsMap.get(dedupeKey);
      if (now - existing.timestamp < 60000) {
        logDedupe(dedupeKey);
        return res.status(200).json(existing.response);
      }
    }

    // Save dedicated Quotation entry
    const quotation = await saveQuotation({
      name,
      email: cleanEmail,
      phone: cleanPhone,
      company: company || '',
      gstin: gstin || '',
      product: cleanProduct,
      quantity: cleanQuantity,
      deliveryTimeline: deliveryTimeline || 'Immediate Dispatch',
      deliveryLocation: cleanLocation,
      specifications: specifications || message || '',
      message: message || specifications || 'Official quotation requested.',
      source: source || 'rfq-form'
    });

    // Send dedicated Quotation notification to sales desk
    const salesEmailResult = await sendQuotationNotification(quotation).catch(err => ({ sent: false, error: err.message }));
    logEmail('SALES_QUOTATION_ALERT', config.company.email, salesEmailResult);

    // Send customer commercial quotation acknowledgment email
    const customerEmailResult = cleanEmail
      ? await sendCustomerQuotationAcknowledgment(quotation).catch(err => ({ sent: false, error: err.message }))
      : { sent: false, reason: 'no_customer_email' };
    if (cleanEmail) logEmail('CUSTOMER_QUOTATION_ACK', cleanEmail, customerEmailResult);

    // Dedicated WhatsApp link for commercial quotations
    const waQuoteText = encodeURIComponent(
      `Hello Ariselux Sales Desk, I requested an Official Quotation (Ref #${quotation.id}):\n*Model:* ${quotation.product}\n*Quantity:* ${quotation.quantity}\n*Delivery Site:* ${quotation.deliveryLocation} (${quotation.deliveryTimeline})\n*Company:* ${quotation.company}\n*Buyer:* ${quotation.name}\n*Phone:* ${quotation.phone}`
    );
    const whatsappUrl = `https://wa.me/${config.company.whatsapp}?text=${waQuoteText}`;

    const responseData = {
      success: true,
      entryType: 'quotation',
      message: 'Official commercial quotation request received successfully. Our engineering desk will connect with unit pricing within 2-4 business hours.',
      quotation: {
        id: quotation.id,
        name: quotation.name,
        product: quotation.product,
        quantity: quotation.quantity,
        deliveryTimeline: quotation.deliveryTimeline,
        deliveryLocation: quotation.deliveryLocation,
        createdAt: quotation.createdAt
      },
      emailDelivery: {
        salesDesk: salesEmailResult.sent 
          ? `Delivered to ${config.company.email}` 
          : (salesEmailResult.message || salesEmailResult.error || 'SMTP credentials not configured in backend/.env'),
        customerAck: customerEmailResult.sent
          ? `Delivered to ${cleanEmail}`
          : (customerEmailResult.reason || customerEmailResult.error || 'Not sent')
      },
      whatsappDirectUrl: whatsappUrl
    };

    logQuotation(quotation, {
      salesDesk: salesEmailResult.sent ? `Delivered to ${config.company.email}` : (salesEmailResult.error || 'failed'),
      customerAck: customerEmailResult.sent ? `Delivered to ${cleanEmail}` : (customerEmailResult.reason || customerEmailResult.error || 'not sent')
    });

    recentSubmissionsMap.set(dedupeKey, { timestamp: now, response: responseData });
    return res.status(201).json(responseData);
  } catch (err) {
    logError('QUOTATION', `Unhandled error in createQuotation`, err);
    next(err);
  }
}

// ── 2. DEDICATED TECHNICAL ENQUIRY CONTROLLER ────────────────
export async function createEnquiry(req, res, next) {
  try {
    req.body = normalizeBody(req.body);
    const { 
      name, email, phone, company, location, enquiryType, 
      product, projectType, preferredChannel, message, 
      source, website_hp, _gotcha 
    } = req.body;

    // Honeypot spam check
    if (website_hp || _gotcha) {
      console.warn(`[SPAM DETECTED] Honeypot triggered from IP: ${req.ip}`);
      logSpam(req.ip);
      return res.status(200).json({
        success: true,
        entryType: 'enquiry',
        message: 'Technical enquiry received.'
      });
    }

    if (!checkRateLimit(req, 'enquiry')) {
      return res.status(429).json({
        success: false,
        message: 'Too many enquiry requests submitted. Please connect directly via WhatsApp at +91-8126732502.'
      });
    }

    // Required fields for Enquiry
    if (!name || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Full Name, Contact Phone number, and Enquiry details/message are required.'
      });
    }

    const cleanPhone = phone.replace(/[^0-9+]/g, '');
    if (cleanPhone.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid contact phone number.'
      });
    }

    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanProduct = (product || 'General Technical Enquiry').trim();
    const cleanEnquiryType = (enquiryType || 'Technical Consultation').trim();
    const cleanChannel = (preferredChannel || 'WhatsApp').trim();

    // Deduplication check: 60-second window
    const now = Date.now();
    const dedupeKey = `enq_${cleanPhone}_${cleanEmail}_${cleanProduct.toLowerCase()}`;
    if (recentSubmissionsMap.has(dedupeKey)) {
      const existing = recentSubmissionsMap.get(dedupeKey);
      if (now - existing.timestamp < 60000) {
        logDedupe(dedupeKey);
        return res.status(200).json(existing.response);
      }
    }

    // Save dedicated Enquiry entry
    const enquiry = await saveEnquiry({
      name,
      email: cleanEmail,
      phone: cleanPhone,
      company: company || '',
      location: location || '',
      enquiryType: cleanEnquiryType,
      product: cleanProduct,
      projectType: projectType || 'General Infrastructure',
      preferredChannel: cleanChannel,
      message,
      source: source || 'enquiry-form'
    });

    // Send dedicated Enquiry notification to technical desk
    const salesEmailResult = await sendEnquiryNotification(enquiry).catch(err => ({ sent: false, error: err.message }));
    logEmail('SALES_ENQUIRY_ALERT', config.company.email, salesEmailResult);

    // Send customer technical consultation acknowledgment email
    const customerEmailResult = cleanEmail
      ? await sendCustomerEnquiryAcknowledgment(enquiry).catch(err => ({ sent: false, error: err.message }))
      : { sent: false, reason: 'no_customer_email' };
    if (cleanEmail) logEmail('CUSTOMER_ENQUIRY_ACK', cleanEmail, customerEmailResult);

    // Dedicated WhatsApp link for technical enquiries
    const waEnqText = encodeURIComponent(
      `Hello Ariselux Engineering Desk, I submitted a Technical Enquiry (Ref #${enquiry.id}):\n*Nature:* ${enquiry.enquiryType}\n*Equipment:* ${enquiry.product}\n*Project:* ${enquiry.projectType}\n*Preferred Channel:* ${enquiry.preferredChannel}\n*Name:* ${enquiry.name}\n*Phone:* ${enquiry.phone}\n*Query:* ${enquiry.message}`
    );
    const whatsappUrl = `https://wa.me/${config.company.whatsapp}?text=${waEnqText}`;

    const responseData = {
      success: true,
      entryType: 'enquiry',
      message: 'Technical consultation enquiry received successfully. Our engineering team will connect with you within 2-4 business hours.',
      enquiry: {
        id: enquiry.id,
        name: enquiry.name,
        enquiryType: enquiry.enquiryType,
        product: enquiry.product,
        preferredChannel: enquiry.preferredChannel,
        createdAt: enquiry.createdAt
      },
      emailDelivery: {
        salesDesk: salesEmailResult.sent 
          ? `Delivered to ${config.company.email}` 
          : (salesEmailResult.message || salesEmailResult.error || 'SMTP credentials not configured in backend/.env'),
        customerAck: customerEmailResult.sent
          ? `Delivered to ${cleanEmail}`
          : (customerEmailResult.reason || customerEmailResult.error || 'Not sent')
      },
      whatsappDirectUrl: whatsappUrl
    };

    logEnquiry(enquiry, {
      salesDesk: salesEmailResult.sent ? `Delivered to ${config.company.email}` : (salesEmailResult.error || 'failed'),
      customerAck: customerEmailResult.sent ? `Delivered to ${cleanEmail}` : (customerEmailResult.reason || customerEmailResult.error || 'not sent')
    });

    recentSubmissionsMap.set(dedupeKey, { timestamp: now, response: responseData });
    return res.status(201).json(responseData);
  } catch (err) {
    logError('ENQUIRY', `Unhandled error in createEnquiry`, err);
    next(err);
  }
}

// ── 3. GENERAL / LEGACY DISPATCHER (Intelligently splits Quotation vs Enquiry) ─
export async function createInquiry(req, res, next) {
  const body = req.body && typeof req.body === 'object' && !Array.isArray(req.body)
    ? req.body
    : {};
  const source = asText(body.source).toLowerCase();
  const isQuotation = 
    body.entryType === 'quotation' ||
    body.type === 'quotation' ||
    source.includes('rfq') ||
    source.includes('quotation') ||
    Boolean(body.quantity) ||
    Boolean(body.deliveryTimeline);

  if (isQuotation) {
    return createQuotation(req, res, next);
  }
  return createEnquiry(req, res, next);
}

// ── 4. RETRIEVAL ENDPOINTS ───────────────────────────────────
export async function getAllQuotations(req, res, next) {
  try {
    const list = await getQuotations();
    return res.json({ success: true, total: list.length, data: list });
  } catch (err) {
    next(err);
  }
}

export async function getSingleQuotation(req, res, next) {
  try {
    const { id } = req.params;
    const item = await getQuotationById(id);
    if (!item) return res.status(404).json({ success: false, message: 'Quotation not found' });
    return res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
}

export async function getAllEnquiries(req, res, next) {
  try {
    const list = await getEnquiries();
    return res.json({ success: true, total: list.length, data: list });
  } catch (err) {
    next(err);
  }
}

export async function getSingleEnquiry(req, res, next) {
  try {
    const { id } = req.params;
    const item = await getEnquiryById(id);
    if (!item) return res.status(404).json({ success: false, message: 'Enquiry not found' });
    return res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
}

export async function getAllInquiries(req, res, next) {
  try {
    const { status, search, type } = req.query;
    let list = await getInquiries();

    if (type === 'quotation') {
      list = list.filter(i => i.entryType === 'quotation' || String(i.id || '').startsWith('RFQ-'));
    } else if (type === 'enquiry') {
      list = list.filter(i => i.entryType === 'enquiry' || String(i.id || '').startsWith('ENQ-'));
    }

    if (typeof status === 'string' && status) {
      list = list.filter(i => String(i.status || '').toLowerCase() === status.toLowerCase());
    }

    if (typeof search === 'string' && search) {
      const q = search.toLowerCase();
      list = list.filter(i =>
        String(i.name || '').toLowerCase().includes(q) ||
        String(i.email || '').toLowerCase().includes(q) ||
        String(i.phone || '').includes(q) ||
        String(i.product || '').toLowerCase().includes(q) ||
        String(i.company || '').toLowerCase().includes(q)
      );
    }

    return res.json({
      success: true,
      total: list.length,
      data: list
    });
  } catch (err) {
    next(err);
  }
}

export async function getSingleInquiry(req, res, next) {
  try {
    const { id } = req.params;
    const inquiry = await getInquiryById(id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
    return res.json({ success: true, data: inquiry });
  } catch (err) {
    next(err);
  }
}

export async function changeInquiryStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const validStatuses = ['new', 'contacted', 'quoted', 'completed', 'archived'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed: ${validStatuses.join(', ')}`
      });
    }

    const updated = await updateInquiryStatus(id, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    return res.json({
      success: true,
      message: `Status updated to ${status}`,
      data: updated
    });
  } catch (err) {
    next(err);
  }
}
