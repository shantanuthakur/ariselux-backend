import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');
const QUOTATIONS_FILE = path.join(DATA_DIR, 'quotations.json');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');
const SUBSCRIBERS_FILE = path.join(DATA_DIR, 'subscribers.json');

// Ensure data folder and files exist
async function ensureFiles() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const files = [
      { path: INQUIRIES_FILE, default: '[]' },
      { path: QUOTATIONS_FILE, default: '[]' },
      { path: ENQUIRIES_FILE, default: '[]' },
      { path: SUBSCRIBERS_FILE, default: '[]' }
    ];
    for (const f of files) {
      try {
        await fs.access(f.path);
      } catch {
        await fs.writeFile(f.path, f.default, 'utf-8');
      }
    }
  } catch (err) {
    console.error('Failed to initialize data files:', err);
  }
}

// ── QUOTATIONS STORAGE (Distinct RFQ Commercial Entries) ──────
export async function getQuotations() {
  await ensureFiles();
  try {
    const data = await fs.readFile(QUOTATIONS_FILE, 'utf-8');
    const list = JSON.parse(data || '[]');
    return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (err) {
    console.error('Error reading quotations:', err);
    return [];
  }
}

export async function getQuotationById(id) {
  const quotations = await getQuotations();
  return quotations.find(q => q.id === id) || null;
}

export async function saveQuotation(quoteData) {
  await ensureFiles();
  const quotations = await getQuotations();
  
  const idSuffix = crypto.randomBytes(3).toString('hex').toUpperCase();
  const newQuotation = {
    id: `RFQ-${Date.now().toString(36).toUpperCase()}-${idSuffix}`,
    entryType: 'quotation',
    name: quoteData.name ? quoteData.name.trim() : '',
    email: quoteData.email ? quoteData.email.trim().toLowerCase() : '',
    phone: quoteData.phone ? quoteData.phone.trim() : '',
    company: quoteData.company ? quoteData.company.trim() : 'Direct Buyer',
    gstin: quoteData.gstin ? quoteData.gstin.trim() : '',
    product: quoteData.product ? quoteData.product.trim() : 'Ariselux Light Tower',
    quantity: quoteData.quantity ? quoteData.quantity.trim() : '1 Unit',
    deliveryTimeline: quoteData.deliveryTimeline ? quoteData.deliveryTimeline.trim() : 'Immediate Dispatch',
    deliveryLocation: quoteData.deliveryLocation || quoteData.location ? (quoteData.deliveryLocation || quoteData.location).trim() : 'Not specified',
    specifications: quoteData.specifications ? quoteData.specifications.trim() : '',
    message: quoteData.message ? quoteData.message.trim() : '',
    source: quoteData.source || 'quotation-form',
    status: 'new', // new, quoted, proforma_sent, dispatched, completed
    createdAt: new Date().toISOString()
  };

  quotations.unshift(newQuotation);
  await fs.writeFile(QUOTATIONS_FILE, JSON.stringify(quotations, null, 2), 'utf-8');

  // Also record in inquiries unified ledger for backward compatibility
  try {
    const inquiries = await getInquiries();
    inquiries.unshift(newQuotation);
    await fs.writeFile(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), 'utf-8');
  } catch (_) {}

  return newQuotation;
}

export async function updateQuotationStatus(id, status) {
  await ensureFiles();
  const quotations = await getQuotations();
  const index = quotations.findIndex(q => q.id === id);
  if (index === -1) return null;
  
  quotations[index].status = status;
  quotations[index].updatedAt = new Date().toISOString();
  await fs.writeFile(QUOTATIONS_FILE, JSON.stringify(quotations, null, 2), 'utf-8');
  await updateUnifiedStatus(id, status);
  return quotations[index];
}

// ── ENQUIRIES STORAGE (Distinct Technical Consultation Entries) ─
export async function getEnquiries() {
  await ensureFiles();
  try {
    const data = await fs.readFile(ENQUIRIES_FILE, 'utf-8');
    const list = JSON.parse(data || '[]');
    return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (err) {
    console.error('Error reading enquiries:', err);
    return [];
  }
}

export async function getEnquiryById(id) {
  const enquiries = await getEnquiries();
  return enquiries.find(e => e.id === id) || null;
}

export async function saveEnquiry(enquiryData) {
  await ensureFiles();
  const enquiries = await getEnquiries();

  const idSuffix = crypto.randomBytes(3).toString('hex').toUpperCase();
  const newEnquiry = {
    id: `ENQ-${Date.now().toString(36).toUpperCase()}-${idSuffix}`,
    entryType: 'enquiry',
    name: enquiryData.name ? enquiryData.name.trim() : '',
    email: enquiryData.email ? enquiryData.email.trim().toLowerCase() : '',
    phone: enquiryData.phone ? enquiryData.phone.trim() : '',
    company: enquiryData.company ? enquiryData.company.trim() : '',
    location: enquiryData.location ? enquiryData.location.trim() : '',
    enquiryType: enquiryData.enquiryType ? enquiryData.enquiryType.trim() : 'Technical Consultation',
    product: enquiryData.product ? enquiryData.product.trim() : 'General Enquiry',
    projectType: enquiryData.projectType ? enquiryData.projectType.trim() : 'General Infrastructure',
    preferredChannel: enquiryData.preferredChannel ? enquiryData.preferredChannel.trim() : 'WhatsApp',
    message: enquiryData.message ? enquiryData.message.trim() : '',
    source: enquiryData.source || 'enquiry-form',
    status: 'new', // new, reviewed, responded, closed
    createdAt: new Date().toISOString()
  };

  enquiries.unshift(newEnquiry);
  await fs.writeFile(ENQUIRIES_FILE, JSON.stringify(enquiries, null, 2), 'utf-8');

  // Also record in inquiries unified ledger for backward compatibility
  try {
    const inquiries = await getInquiries();
    inquiries.unshift(newEnquiry);
    await fs.writeFile(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), 'utf-8');
  } catch (_) {}

  return newEnquiry;
}

export async function updateEnquiryStatus(id, status) {
  await ensureFiles();
  const enquiries = await getEnquiries();
  const index = enquiries.findIndex(e => e.id === id);
  if (index === -1) return null;
  
  enquiries[index].status = status;
  enquiries[index].updatedAt = new Date().toISOString();
  await fs.writeFile(ENQUIRIES_FILE, JSON.stringify(enquiries, null, 2), 'utf-8');
  await updateUnifiedStatus(id, status);
  return enquiries[index];
}

async function updateUnifiedStatus(id, status) {
  await ensureFiles();
  const inquiries = await getInquiries();
  const index = inquiries.findIndex(item => item.id === id);
  if (index === -1) return;
  inquiries[index].status = status;
  inquiries[index].updatedAt = new Date().toISOString();
  await fs.writeFile(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), 'utf-8');
}

// ── UNIFIED INQUIRIES STORAGE (For backward compatibility) ────
export async function getInquiries() {
  await ensureFiles();
  try {
    const data = await fs.readFile(INQUIRIES_FILE, 'utf-8');
    const list = JSON.parse(data || '[]');
    return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (err) {
    console.error('Error reading inquiries:', err);
    return [];
  }
}

export async function getInquiryById(id) {
  if (id.startsWith('RFQ-')) return getQuotationById(id);
  if (id.startsWith('ENQ-')) return getEnquiryById(id);
  const inquiries = await getInquiries();
  return inquiries.find(i => i.id === id) || null;
}

export async function saveInquiry(inquiryData) {
  const source = typeof inquiryData.source === 'string' ? inquiryData.source.toLowerCase() : '';
  // If explicitly a quotation or contains quotation indicators, route to saveQuotation
  if (inquiryData.entryType === 'quotation' || 
      inquiryData.type === 'quotation' || 
      source.includes('rfq') ||
      source.includes('quotation') ||
      inquiryData.quantity) {
    return saveQuotation(inquiryData);
  }
  // Otherwise route to saveEnquiry
  return saveEnquiry(inquiryData);
}

export async function updateInquiryStatus(id, status) {
  if (id.startsWith('RFQ-')) return updateQuotationStatus(id, status);
  if (id.startsWith('ENQ-')) return updateEnquiryStatus(id, status);
  await ensureFiles();
  const inquiries = await getInquiries();
  const index = inquiries.findIndex(i => i.id === id);
  if (index === -1) return null;
  
  inquiries[index].status = status;
  inquiries[index].updatedAt = new Date().toISOString();
  await fs.writeFile(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), 'utf-8');
  return inquiries[index];
}

// Subscribers Storage
export async function getSubscribers() {
  await ensureFiles();
  try {
    const data = await fs.readFile(SUBSCRIBERS_FILE, 'utf-8');
    return JSON.parse(data || '[]');
  } catch {
    return [];
  }
}

export async function saveSubscriber(email) {
  await ensureFiles();
  const subscribers = await getSubscribers();
  const cleanEmail = email.trim().toLowerCase();

  const existing = subscribers.find(s => s.email === cleanEmail);
  if (existing) {
    return { subscriber: existing, alreadySubscribed: true };
  }

  const newSubscriber = {
    id: `SUB-${Date.now().toString(36).toUpperCase()}`,
    email: cleanEmail,
    subscribedAt: new Date().toISOString()
  };

  subscribers.push(newSubscriber);
  await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2), 'utf-8');
  return { subscriber: newSubscriber, alreadySubscribed: false };
}
