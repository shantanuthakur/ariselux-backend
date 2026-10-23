import nodemailer from 'nodemailer';
import { getConfig } from '../config/index.js';

/**
 * Creates a fresh transporter from current config
 */
function createTransporter(cfg) {
  if (!cfg.smtp.host || !cfg.smtp.user || !cfg.smtp.pass) {
    return null;
  }
  return nodemailer.createTransport({
    host: cfg.smtp.host,
    port: cfg.smtp.port,
    secure: cfg.smtp.secure,
    auth: { user: cfg.smtp.user, pass: cfg.smtp.pass },
    tls: { rejectUnauthorized: false },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000
  });
}

// SMTP connections from the hosted container can occasionally be reset after
// the internal notification has been accepted.  A fresh connection and a
// short retry make the customer receipt independent from that transient
// failure.  Do not retry permanent recipient/authentication errors.
const RETRYABLE_SMTP_CODES = new Set([
  'ECONNRESET', 'ECONNREFUSED', 'EHOSTUNREACH', 'EPIPE', 'ESOCKET',
  'ETIMEDOUT', 'EAI_AGAIN'
]);

const wait = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

function normalizeEmailAddress(value) {
  const match = String(value || '').match(/<([^>]+)>/);
  return (match ? match[1] : value).trim().toLowerCase();
}

async function sendMailWithRetry(currentConfig, initialMailer, message, expectedRecipient, maxAttempts = 3) {
  const expected = normalizeEmailAddress(expectedRecipient);
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const mailer = attempt === 1 ? initialMailer : createTransporter(currentConfig);
    if (!mailer) return { sent: false, reason: 'missing_credentials', attempts: attempt - 1 };

    try {
      const info = await mailer.sendMail(message);
      const accepted = (info.accepted || []).map(normalizeEmailAddress);
      const rejected = (info.rejected || []).map(normalizeEmailAddress);

      if (expected && !accepted.includes(expected)) {
        return {
          sent: false,
          reason: 'recipient_not_accepted',
          error: `SMTP did not accept ${expectedRecipient}`,
          accepted: info.accepted || [],
          rejected: info.rejected || [],
          attempts: attempt
        };
      }

      return {
        sent: true,
        messageId: info.messageId,
        accepted: info.accepted || [],
        rejected: info.rejected || [],
        attempts: attempt
      };
    } catch (err) {
      lastError = err;
      if (!RETRYABLE_SMTP_CODES.has(err.code) || attempt === maxAttempts) break;
      await wait(attempt * 500);
    } finally {
      // Each retry must use a clean SMTP socket; closing is also safe after a
      // successful one-off Nodemailer send.
      mailer.close();
    }
  }

  return {
    sent: false,
    error: lastError?.message || 'Unable to send email',
    errorCode: lastError?.code,
    attempts: maxAttempts
  };
}

/**
 * Test SMTP connection & send a test email to sales desk
 */
export async function testSmtpConnection() {
  const currentConfig = getConfig();
  const { smtp, company } = currentConfig;

  if (!smtp.user || !smtp.pass) {
    return {
      success: false,
      configured: false,
      message: 'SMTP credentials are incomplete. Please set SMTP_USER and SMTP_PASS in backend/.env',
      currentConfig: {
        host: smtp.host || 'Not set',
        port: smtp.port,
        secure: smtp.secure,
        user: smtp.user ? `${smtp.user.substring(0, 3)}***` : 'NOT SET',
        pass: smtp.pass ? '******' : 'NOT SET',
        fromEmail: smtp.fromEmail,
        companySalesEmail: company.email
      }
    };
  }

  const transporter = createTransporter(currentConfig);
  if (!transporter) {
    return { success: false, configured: false, message: 'Could not initialize SMTP transporter.' };
  }

  try {
    await transporter.verify();
    return {
      success: true,
      configured: true,
      message: `SMTP connection to ${smtp.host} verified successfully. No test email sent.`
    };
  } catch (err) {
    let troubleshooting = '';
    if (smtp.host.includes('gmail')) {
      troubleshooting = 'For Gmail: enable 2-Step Verification and generate a 16-character Google App Password at https://myaccount.google.com/apppasswords';
    } else if (err.code === 'ECONNREFUSED' || err.code === 'ETIMEDOUT') {
      troubleshooting = 'Check SMTP_PORT (465 for secure=true, 587 for secure=false) and firewall settings.';
    }
    return { success: false, configured: true, error: err.message, errorCode: err.code, troubleshooting };
  }
}

/* ==========================================================
   1. QUOTATION SALES NOTIFICATION EMAIL (sent to sales1@ariselux.com)
   Purpose: Alert internal sales team of a new official Commercial RFQ
   Style: Executive Navy & Golden Amber Commercial Quotation theme
   ========================================================== */
export async function sendQuotationNotification(quotation) {
  const currentConfig = getConfig();
  const { smtp, company } = currentConfig;
  const mailer = createTransporter(currentConfig);

  const cleanPhone = (quotation.phone || '').replace(/[^0-9]/g, '');
  const waQuoteText = encodeURIComponent(
    `Hello ${quotation.name}, regarding your Quotation Request for ${quotation.product} (Ref #${quotation.id}, Qty: ${quotation.quantity}):\nHere is our official factory pricing from Ariselux Roorkee Works...`
  );

  const quotationSalesHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#0f172a;font-family:'Segoe UI',Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;padding:35px 0;">
    <tr><td align="center">
      <table width="640" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.3);">

        <!-- HEADER: COMMERCIAL RFQ BANNER -->
        <tr>
          <td style="background:linear-gradient(135deg, #0b1e36 0%, #13325c 100%);padding:26px 32px;border-bottom:4px solid #1b5faa;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <span style="display:inline-block;background:#1b5faa;color:#ffffff;font-size:11px;font-weight:800;letter-spacing:1.5px;padding:4px 10px;border-radius:4px;text-transform:uppercase;margin-bottom:8px;">
                    COMMERCIAL QUOTATION REQUEST (RFQ)
                  </span>
                  <h1 style="margin:0;font-size:22px;color:#ffffff;font-weight:800;letter-spacing:-0.5px;">New Price Quotation Alert 📋</h1>
                  <p style="margin:6px 0 0;font-size:13px;color:#e0f2fe;">Roorkee Works Direct OEM Pricing &amp; Freight Calculation</p>
                </td>
                <td align="right" style="vertical-align:top;">
                  <div style="background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.22);border-radius:8px;padding:8px 16px;text-align:center;">
                    <div style="font-size:10px;color:#e0f2fe;font-weight:700;letter-spacing:1px;text-transform:uppercase;">QUOTATION ID</div>
                    <div style="font-size:15px;font-weight:800;color:#ffffff;font-family:monospace;margin-top:2px;">#${quotation.id}</div>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- PRIORITY MODEL & QUANTITY CARD -->
        <tr>
          <td style="background:#f0f9ff;padding:18px 32px;border-bottom:1px solid #bae6fd;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="width:65%;">
                  <span style="font-size:11px;font-weight:700;color:#0369a1;text-transform:uppercase;letter-spacing:1px;">Target Product / Model</span>
                  <h2 style="margin:4px 0 0;font-size:22px;font-weight:800;color:#0c4a6e;">${quotation.product}</h2>
                </td>
                <td style="width:35%;text-align:right;">
                  <span style="font-size:11px;font-weight:700;color:#0369a1;text-transform:uppercase;letter-spacing:1px;">Quantity Required</span>
                  <div style="margin-top:4px;font-size:18px;font-weight:800;color:#0369a1;background:#ffffff;padding:4px 12px;border-radius:6px;display:inline-block;border:1px solid #7dd3fc;">
                    ${quotation.quantity || '1 Unit'}
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- COMMERCIAL DETAILS BREAKDOWN TABLE -->
        <tr>
          <td style="padding:26px 32px;">
            <div style="font-size:12px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">Commercial Buyer Specifications</div>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
              <tr style="background:#f8fafc;">
                <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.5px;width:38%;border-bottom:1px solid #e2e8f0;">Buyer Name</td>
                <td style="padding:12px 16px;font-size:15px;font-weight:700;color:#0f172a;border-bottom:1px solid #e2e8f0;">${quotation.name}</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #e2e8f0;">Company / Org</td>
                <td style="padding:12px 16px;font-weight:700;color:#1e40af;border-bottom:1px solid #e2e8f0;">${quotation.company || '<span style="color:#94a3b8;font-style:italic;">Direct Buyer</span>'}</td>
              </tr>
              ${quotation.gstin ? `
              <tr style="background:#f8fafc;">
                <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #e2e8f0;">GSTIN / Tax ID</td>
                <td style="padding:12px 16px;font-family:monospace;font-weight:700;color:#0f172a;border-bottom:1px solid #e2e8f0;">${quotation.gstin}</td>
              </tr>` : ''}
              <tr style="background:#f8fafc;">
                <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #e2e8f0;">Delivery City / State</td>
                <td style="padding:12px 16px;font-weight:700;color:#0f172a;border-bottom:1px solid #e2e8f0;">${quotation.deliveryLocation || quotation.location || 'Not specified'}</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #e2e8f0;">Target Delivery Timeline</td>
                <td style="padding:12px 16px;font-weight:700;color:#1e40af;border-bottom:1px solid #e2e8f0;">${quotation.deliveryTimeline || 'Immediate Dispatch'}</td>
              </tr>
              <tr style="background:#f8fafc;">
                <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #e2e8f0;">Contact Mobile / Phone</td>
                <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;">
                  <a href="tel:${quotation.phone}" style="font-size:15px;font-weight:700;color:#2563eb;text-decoration:none;">${quotation.phone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #e2e8f0;">Work Email Address</td>
                <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;">
                  ${quotation.email ? `<a href="mailto:${quotation.email}" style="color:#2563eb;font-weight:600;text-decoration:none;">${quotation.email}</a>` : '<span style="color:#94a3b8;font-style:italic;">Not provided</span>'}
                </td>
              </tr>
              <tr style="background:#f8fafc;">
                <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #e2e8f0;vertical-align:top;">Commercial Notes / Specs</td>
                <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;white-space:pre-wrap;line-height:1.6;color:#334155;">${quotation.specifications || quotation.message || 'Official price quotation and delivery freight requested.'}</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.5px;">Quotation Source</td>
                <td style="padding:12px 16px;color:#64748b;font-size:13px;">${quotation.source || 'website-rfq'} • ${new Date(quotation.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- FAST ACTIONS -->
        <tr>
          <td style="padding:0 32px 28px;">
            <table cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="padding-right:10px;">
                  <a href="https://wa.me/${cleanPhone}?text=${waQuoteText}" style="background:#16a34a;color:#ffffff;padding:12px 20px;text-decoration:none;border-radius:6px;font-weight:700;font-size:13px;display:inline-block;text-align:center;">
                    💬 WhatsApp Commercial Quote
                  </a>
                </td>
                ${quotation.email ? `
                <td style="padding-right:10px;">
                  <a href="mailto:${quotation.email}?subject=Official%20Commercial%20Quotation%20-%20${encodeURIComponent(quotation.product)}%20(Ref%20%23${quotation.id})&body=Dear%20${encodeURIComponent(quotation.name)}%2C%0A%0AThank%20you%20for%20your%20quotation%20request%20for%20${encodeURIComponent(quotation.product)}%20(Ref%20%23${quotation.id}).%0APlease%20find%20our%20official%20commercial%20offer%20and%20technical%20proposal%20attached." style="background:#1e40af;color:#ffffff;padding:12px 20px;text-decoration:none;border-radius:6px;font-weight:700;font-size:13px;display:inline-block;text-align:center;">
                    ✉️ Email Quotation PDF
                  </a>
                </td>` : ''}
                <td>
                  <a href="tel:${quotation.phone}" style="background:#334155;color:#ffffff;padding:12px 18px;text-decoration:none;border-radius:6px;font-weight:700;font-size:13px;display:inline-block;text-align:center;">
                    📞 Call Buyer
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background:#0b1e36;padding:22px 32px;text-align:center;">
            <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#e2e8f0;">Ariselux Equipments Private Limited</p>
            <p style="margin:0 0 6px;font-size:12px;color:#94a3b8;">${company.address}</p>
            <p style="margin:0;font-size:12px;color:#64748b;">
              <a href="mailto:${company.email}" style="color:#94a3b8;text-decoration:none;">${company.email}</a> · 
              <a href="https://ariselux.com" style="color:#94a3b8;text-decoration:none;">ariselux.com</a> · Direct OEM Roorkee Works
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  if (!mailer) {
    console.log(`[QUOTATION EMAIL NOTICE: SMTP credentials missing] ID: ${quotation.id} | Product: ${quotation.product} | Qty: ${quotation.quantity}`);
    return { sent: false, reason: 'missing_credentials', message: 'SMTP_USER or SMTP_PASS not set in backend/.env' };
  }

  try {
    const textContent = `New Commercial Quotation Request (Ref #${quotation.id})\n\nModel: ${quotation.product}\nQuantity: ${quotation.quantity || '1 Unit'}\nDelivery Timeline: ${quotation.deliveryTimeline || 'Immediate Dispatch'}\nDelivery Location: ${quotation.deliveryLocation || quotation.location || 'N/A'}\n\nBuyer Details:\nName: ${quotation.name}\nCompany: ${quotation.company || 'Direct Buyer'}\nPhone: ${quotation.phone}\nEmail: ${quotation.email}\nGSTIN: ${quotation.gstin || 'N/A'}\n\nRequirements / Notes:\n${quotation.specifications || quotation.message || 'Standard deployment'}\n\nSource: ${quotation.source || 'Website'}`;

    const info = await mailer.sendMail({
      from: `"Ariselux Quotation Desk" <${smtp.user}>`,
      to: company.email,
      replyTo: quotation.email || company.email,
      subject: `Commercial RFQ: ${quotation.product} (${quotation.quantity || '1 Unit'}) - ${quotation.name} (Ref ${quotation.id})`,
      text: textContent,
      html: quotationSalesHtml
    });
    console.log(`[QUOTATION SALES EMAIL SENT]: Delivered to ${company.email} (ID: ${info.messageId})`);
    return { sent: true, messageId: info.messageId };
  } catch (err) {
    console.error(`[QUOTATION EMAIL ERROR] Failed to send to ${company.email}:`, err.message);
    return { sent: false, error: err.message };
  }
}

/* ==========================================================
   2. CUSTOMER QUOTATION ACKNOWLEDGMENT EMAIL (sent to buyer's inbox)
   Purpose: Official branded Commercial Quotation receipt to buyer
   Style: Executive Navy & Green Commercial Receipt with breakdown
   ========================================================== */
export async function sendCustomerQuotationAcknowledgment(quotation) {
  if (!quotation.email) return { sent: false, reason: 'no_customer_email' };

  const currentConfig = getConfig();
  const { smtp, company } = currentConfig;
  const mailer = createTransporter(currentConfig);
  if (!mailer) return { sent: false, reason: 'missing_credentials' };

  const customerQuotationHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:'Segoe UI',Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:35px 0;">
    <tr><td align="center">
      <table width="640" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 4px 15px rgba(0,0,0,0.06);">

        <!-- HEADER: BRANDED BANNER -->
        <tr>
          <td style="background:linear-gradient(135deg, #0b1e36 0%, #13325c 100%);padding:26px 32px;border-bottom:4px solid #1b5faa;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <span style="display:inline-block;background:#1b5faa;color:#ffffff;font-size:11px;font-weight:800;letter-spacing:1.5px;padding:4px 10px;border-radius:4px;text-transform:uppercase;margin-bottom:8px;">
                    ARISELUX EQUIPMENTS PVT LTD
                  </span>
                  <h1 style="margin:0;font-size:22px;color:#ffffff;font-weight:800;letter-spacing:-0.5px;">Quotation Request Received</h1>
                  <p style="margin:6px 0 0;font-size:13px;color:#e0f2fe;">Commercial Estimation &amp; Application Desk &bull; Roorkee Works</p>
                </td>
                <td align="right" style="vertical-align:top;">
                  <div style="background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.22);border-radius:8px;padding:8px 16px;text-align:center;">
                    <div style="font-size:10px;color:#e0f2fe;font-weight:700;letter-spacing:1px;text-transform:uppercase;">QUOTATION REF</div>
                    <div style="font-size:15px;font-weight:800;color:#ffffff;font-family:monospace;margin-top:2px;">#${quotation.id}</div>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- SUB BANNER -->
        <tr>
          <td style="background:#f0f9ff;padding:18px 32px;border-bottom:1px solid #bae6fd;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="width:65%;">
                  <span style="font-size:11px;font-weight:700;color:#0369a1;text-transform:uppercase;letter-spacing:1px;">Selected Model</span>
                  <h2 style="margin:4px 0 0;font-size:20px;font-weight:800;color:#0c4a6e;">${quotation.product}</h2>
                </td>
                <td style="width:35%;text-align:right;">
                  <span style="font-size:11px;font-weight:700;color:#0369a1;text-transform:uppercase;letter-spacing:1px;">Quantity Required</span>
                  <div style="margin-top:4px;font-size:15px;font-weight:800;color:#0369a1;background:#ffffff;padding:4px 12px;border-radius:6px;display:inline-block;border:1px solid #7dd3fc;">
                    ${quotation.quantity || '1 Unit'}
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- CONTENT -->
        <tr>
          <td style="padding:28px 32px;">
            <p style="margin:0 0 14px;font-size:15px;color:#1e293b;">Dear <strong>${quotation.name}</strong>,</p>
            <p style="margin:0 0 20px;font-size:14px;color:#475569;line-height:1.7;">
              Thank you for reaching out to <strong>Ariselux Equipments Private Limited</strong>. Our sales engineering and estimation desk at <strong>Roorkee Works</strong> has successfully registered your commercial quotation request for:
            </p>

            <!-- PRODUCT HIGHLIGHT -->
            <div style="background:#eff6ff;border:1px solid #bfdbfe;border-left:5px solid #1b5faa;border-radius:8px;padding:18px 22px;margin:0 0 24px;">
              <div style="font-size:11px;font-weight:800;color:#0369a1;letter-spacing:1px;text-transform:uppercase;margin-bottom:4px;">Requested Model &amp; Series</div>
              <div style="font-size:22px;font-weight:800;color:#0c4a6e;">${quotation.product}</div>
              <div style="font-size:13px;color:#1e40af;margin-top:4px;">OEM Direct Factory Dispatch • ISO 9001:2015 Certified Mechanical Engineering</div>
            </div>

            <!-- ITEMIZED RFQ BREAKDOWN -->
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:18px 20px;margin-bottom:24px;">
              <div style="font-size:11px;font-weight:800;color:#64748b;letter-spacing:1px;text-transform:uppercase;margin-bottom:12px;">Quotation Specifications Summary</div>
              <table width="100%" cellpadding="6" cellspacing="0" style="font-size:13px;color:#334155;">
                <tr>
                  <td width="40%" style="font-weight:700;color:#64748b;border-bottom:1px solid #f1f5f9;">Selected Model:</td>
                  <td style="border-bottom:1px solid #f1f5f9;"><strong>${quotation.product}</strong></td>
                </tr>
                <tr>
                  <td style="font-weight:700;color:#64748b;border-bottom:1px solid #f1f5f9;">Quantity Required:</td>
                  <td style="border-bottom:1px solid #f1f5f9;font-weight:700;color:#1e40af;">${quotation.quantity || '1 Unit'}</td>
                </tr>
                <tr>
                  <td style="font-weight:700;color:#64748b;border-bottom:1px solid #f1f5f9;">Delivery Timeline:</td>
                  <td style="border-bottom:1px solid #f1f5f9;font-weight:700;color:#1e40af;">${quotation.deliveryTimeline || 'Immediate Dispatch'}</td>
                </tr>
                <tr>
                  <td style="font-weight:700;color:#64748b;border-bottom:1px solid #f1f5f9;">Delivery Site / Destination:</td>
                  <td style="border-bottom:1px solid #f1f5f9;">${quotation.deliveryLocation || quotation.location || 'Site delivery'}</td>
                </tr>
                ${quotation.company ? `
                <tr>
                  <td style="font-weight:700;color:#64748b;border-bottom:1px solid #f1f5f9;">Company / Org:</td>
                  <td style="border-bottom:1px solid #f1f5f9;">${quotation.company}</td>
                </tr>` : ''}
                ${quotation.specifications || quotation.message ? `
                <tr>
                  <td style="font-weight:700;color:#64748b;vertical-align:top;">Your Requirements:</td>
                  <td style="white-space:pre-wrap;line-height:1.5;">${quotation.specifications || quotation.message}</td>
                </tr>` : ''}
              </table>
            </div>

            <!-- WHAT HAPPENS NEXT -->
            <div style="background:#f8fafc;border-radius:8px;padding:20px;margin-bottom:24px;border:1px solid #e2e8f0;">
              <div style="font-size:12px;font-weight:800;color:#1e293b;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:14px;">Commercial Quotation Next Steps</div>
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="vertical-align:top;width:28px;font-size:18px;">📊</td>
                  <td style="padding-left:12px;font-size:13px;color:#475569;padding-bottom:10px;">
                    <strong>Price &amp; Freight Estimation:</strong> Our sales desk calculates exact ex-works unit price, applicable GST, and logistics transit insurance to your destination.
                  </td>
                </tr>
                <tr>
                  <td style="vertical-align:top;font-size:18px;">📄</td>
                  <td style="padding-left:12px;font-size:13px;color:#475569;padding-bottom:10px;">
                    <strong>Formal Proposal:</strong> You will receive an official commercial proposal with technical specifications and photometric illumination datasheets within <strong>2 to 4 business hours</strong>.
                  </td>
                </tr>
                <tr>
                  <td style="vertical-align:top;font-size:18px;">🚚</td>
                  <td style="padding-left:12px;font-size:13px;color:#475569;">
                    <strong>Dispatch &amp; Support:</strong> Ready stock units can be dispatched from Roorkee within 24-48 hours upon commercial clearance.
                  </td>
                </tr>
              </table>
            </div>

            <!-- INSTANT ASSISTANCE -->
            <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:16px 20px;">
              <div style="font-size:13px;font-weight:700;color:#1e40af;margin-bottom:6px;">Need Instant Commercial Assistance?</div>
              <p style="margin:0 0 10px;font-size:13px;color:#475569;">Connect directly with our Roorkee sales desk right now:</p>
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right:20px;font-size:13px;">
                    📞 <a href="tel:+918923730881" style="color:#2563eb;font-weight:700;text-decoration:none;">+91 89237 30881</a>
                  </td>
                  <td style="font-size:13px;">
                    💬 <a href="https://wa.me/918923730881" target="_blank" style="color:#16a34a;font-weight:700;text-decoration:none;">Connect on WhatsApp (+91 89237 30881)</a>
                  </td>
                </tr>
              </table>
            </div>

          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background:#f8fafc;padding:22px 32px;text-align:center;border-top:1px solid #e2e8f0;">
            <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#0f172a;">Ariselux Equipments Private Limited</p>
            <p style="margin:0 0 6px;font-size:12px;color:#64748b;">${company.address}</p>
            <p style="margin:0;font-size:12px;color:#64748b;">
              <a href="mailto:${smtp.user}" style="color:#1b5faa;text-decoration:none;">${smtp.user}</a> &bull;
              <a href="https://ariselux.com" style="color:#1b5faa;text-decoration:none;">ariselux.com</a> &bull; Direct: <a href="tel:+918923730881" style="color:#1b5faa;font-weight:700;text-decoration:none;">+91 89237 30881</a> &bull; WhatsApp: <a href="https://wa.me/918923730881" target="_blank" style="color:#16a34a;font-weight:700;text-decoration:none;">+91 89237 30881</a> &bull; Toll-Free: <a href="tel:18002025104" style="color:#64748b;text-decoration:none;">1800 202 5104</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  try {
    const textContent = `Dear ${quotation.name},\n\nThank you for reaching out to Ariselux Equipments Private Limited.\nOur sales engineering desk at Roorkee Works has registered your quotation request for ${quotation.product} (Qty: ${quotation.quantity || '1 Unit'}, Ref #${quotation.id}).\n\nOur sales team will prepare and share an official commercial proposal with technical datasheets within 2-4 business hours.\n\nNeed immediate assistance?\nPhone: ${company.phone}\nWhatsApp: https://wa.me/${company.whatsapp}\nEmail: ${smtp.user}\n\nAriselux Equipments Private Limited\nRoorkee Works, Uttarakhand, India`;

    const delivery = await sendMailWithRetry(currentConfig, mailer, {
      from: `"Ariselux Equipments" <${smtp.user}>`,
      to: quotation.email,
      replyTo: smtp.user,
      subject: `Quotation Request Received: ${quotation.product} (Ref #${quotation.id}) - Ariselux Equipments`,
      text: textContent,
      html: customerQuotationHtml
    }, quotation.email);

    if (delivery.sent) {
      console.log(`[CUSTOMER QUOTATION ACK SENT]: Accepted for ${quotation.email} (ID: ${delivery.messageId}, attempt ${delivery.attempts})`);
    } else {
      console.error(`[QUOTATION ACK EMAIL ERROR] Failed to send to ${quotation.email}:`, delivery.error || delivery.reason);
    }
    return delivery;
  } catch (err) {
    console.error(`[QUOTATION ACK EMAIL ERROR] Failed to send to ${quotation.email}:`, err.message);
    return { sent: false, error: err.message };
  }
}

/* ==========================================================
   3. ENQUIRY SALES NOTIFICATION EMAIL (sent to technical desk)
   Purpose: Alert internal engineering/technical team of a consultation query
   Style: Industrial Ariselux Orange & Slate Blue Consultation theme
   ========================================================== */
export async function sendEnquiryNotification(enquiry) {
  const currentConfig = getConfig();
  const { smtp, company } = currentConfig;
  const mailer = createTransporter(currentConfig);

  const cleanPhone = (enquiry.phone || '').replace(/[^0-9]/g, '');
  const waReplyText = encodeURIComponent(
    `Hello ${enquiry.name}, regarding your Technical Enquiry on ${enquiry.product} (Ref #${enquiry.id}):\nOur application engineering desk at Ariselux Roorkee Works is following up on your query...`
  );

  const enquirySalesHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#0f172a;font-family:'Segoe UI',Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;padding:35px 0;">
    <tr><td align="center">
      <table width="640" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.3);">

        <!-- HEADER: TECHNICAL & FACTORY ENQUIRY BANNER -->
        <tr>
          <td style="background:linear-gradient(135deg, #0b1e36 0%, #13325c 100%);padding:26px 32px;border-bottom:4px solid #1b5faa;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <span style="display:inline-block;background:#1b5faa;color:#ffffff;font-size:11px;font-weight:800;letter-spacing:1.5px;padding:4px 10px;border-radius:4px;text-transform:uppercase;margin-bottom:8px;">
                    TECHNICAL &amp; FACTORY ENQUIRY DESK
                  </span>
                  <h1 style="margin:0;font-size:22px;color:#ffffff;font-weight:800;letter-spacing:-0.5px;">New Technical Consultation 📩</h1>
                  <p style="margin:6px 0 0;font-size:13px;color:#e0f2fe;">Direct Engineering Consultation • Bhagwanpur Works</p>
                </td>
                <td align="right" style="vertical-align:top;">
                  <div style="background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.22);border-radius:8px;padding:8px 16px;text-align:center;">
                    <div style="font-size:10px;color:#e0f2fe;font-weight:700;letter-spacing:1px;text-transform:uppercase;">ENQUIRY ID</div>
                    <div style="font-size:15px;font-weight:800;color:#ffffff;font-family:monospace;margin-top:2px;">#${enquiry.id}</div>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- NATURE OF ENQUIRY & TOPIC BADGE -->
        <tr>
          <td style="background:#f0f9ff;padding:18px 32px;border-bottom:1px solid #bae6fd;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="width:65%;">
                  <span style="font-size:11px;font-weight:700;color:#0369a1;text-transform:uppercase;letter-spacing:1px;">Nature of Enquiry</span>
                  <h2 style="margin:4px 0 0;font-size:20px;font-weight:800;color:#0c4a6e;">${enquiry.enquiryType || 'Technical Consultation'}</h2>
                </td>
                <td style="width:35%;text-align:right;">
                  <span style="font-size:11px;font-weight:700;color:#0369a1;text-transform:uppercase;letter-spacing:1px;">Preferred Channel</span>
                  <div style="margin-top:4px;font-size:14px;font-weight:800;color:#0369a1;background:#ffffff;padding:4px 12px;border-radius:6px;display:inline-block;border:1px solid #7dd3fc;">
                    ${enquiry.preferredChannel || 'WhatsApp'}
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ENQUIRY DETAILS BREAKDOWN TABLE -->
        <tr>
          <td style="padding:26px 32px;">
            <div style="font-size:12px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">Customer &amp; Technical Query Details</div>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
              <tr style="background:#f8fafc;">
                <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.5px;width:38%;border-bottom:1px solid #e2e8f0;">Customer Name</td>
                <td style="padding:12px 16px;font-size:15px;font-weight:700;color:#0f172a;border-bottom:1px solid #e2e8f0;">${enquiry.name}</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #e2e8f0;">Equipment / Topic</td>
                <td style="padding:12px 16px;font-weight:700;color:#1e40af;border-bottom:1px solid #e2e8f0;">${enquiry.product}</td>
              </tr>
              <tr style="background:#f8fafc;">
                <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #e2e8f0;">Project / Site Type</td>
                <td style="padding:12px 16px;font-weight:700;color:#0369a1;border-bottom:1px solid #e2e8f0;">${enquiry.projectType || 'General Infrastructure'}</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #e2e8f0;">Company / Location</td>
                <td style="padding:12px 16px;color:#334155;border-bottom:1px solid #e2e8f0;">${enquiry.company ? `${enquiry.company} — ` : ''}${enquiry.location || 'Location not specified'}</td>
              </tr>
              <tr style="background:#f8fafc;">
                <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #e2e8f0;">Contact Mobile</td>
                <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;">
                  <a href="tel:${enquiry.phone}" style="font-size:15px;font-weight:700;color:#2563eb;text-decoration:none;">${enquiry.phone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #e2e8f0;">Email Address</td>
                <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;">
                  ${enquiry.email ? `<a href="mailto:${enquiry.email}" style="color:#2563eb;font-weight:600;text-decoration:none;">${enquiry.email}</a>` : '<span style="color:#94a3b8;font-style:italic;">Not provided</span>'}
                </td>
              </tr>
              <tr style="background:#f8fafc;">
                <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #e2e8f0;vertical-align:top;">Enquiry Query / Message</td>
                <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;white-space:pre-wrap;line-height:1.6;color:#334155;">${enquiry.message}</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.5px;">Submitted Timestamp</td>
                <td style="padding:12px 16px;color:#64748b;font-size:13px;">${enquiry.source || 'website-enquiry'} • ${new Date(enquiry.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- FAST ACTIONS -->
        <tr>
          <td style="padding:0 32px 28px;">
            <table cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="padding-right:10px;">
                  <a href="https://wa.me/${cleanPhone}?text=${waReplyText}" style="background:#16a34a;color:#ffffff;padding:12px 20px;text-decoration:none;border-radius:6px;font-weight:700;font-size:13px;display:inline-block;text-align:center;">
                    💬 WhatsApp on ${enquiry.preferredChannel}
                  </a>
                </td>
                ${enquiry.email ? `
                <td style="padding-right:10px;">
                  <a href="mailto:${enquiry.email}?subject=Re:%20Technical%20Enquiry%20-%20${encodeURIComponent(enquiry.product)}%20(Ref%20%23${enquiry.id})&body=Dear%20${encodeURIComponent(enquiry.name)}%2C%0A%0AThank%20you%20for%20your%20technical%20enquiry%20regarding%20${encodeURIComponent(enquiry.product)}%20(Ref%20%23${enquiry.id}).%0APlease%20find%20our%20engineering%20recommendations%20below:" style="background:#1e40af;color:#ffffff;padding:12px 20px;text-decoration:none;border-radius:6px;font-weight:700;font-size:13px;display:inline-block;text-align:center;">
                    ✉️ Reply via Email
                  </a>
                </td>` : ''}
                <td>
                  <a href="tel:${enquiry.phone}" style="background:#334155;color:#ffffff;padding:12px 18px;text-decoration:none;border-radius:6px;font-weight:700;font-size:13px;display:inline-block;text-align:center;">
                    📞 Call Customer
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background:#0b1e36;padding:22px 32px;text-align:center;">
            <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#e2e8f0;">Ariselux Equipments Private Limited</p>
            <p style="margin:0 0 6px;font-size:12px;color:#94a3b8;">${company.address}</p>
            <p style="margin:0;font-size:12px;color:#64748b;">
              <a href="mailto:${company.email}" style="color:#94a3b8;text-decoration:none;">${company.email}</a> · 
              <a href="https://ariselux.com" style="color:#94a3b8;text-decoration:none;">ariselux.com</a> · Direct OEM Roorkee Works
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  if (!mailer) {
    console.log(`[ENQUIRY EMAIL NOTICE: SMTP credentials missing] ID: ${enquiry.id} | Nature: ${enquiry.enquiryType} | Customer: ${enquiry.name}`);
    return { sent: false, reason: 'missing_credentials', message: 'SMTP_USER or SMTP_PASS not set in backend/.env' };
  }

  try {
    const textContent = `New Technical Enquiry (Ref #${enquiry.id})\n\nNature: ${enquiry.enquiryType || 'General Enquiry'}\nModel / Topic: ${enquiry.product}\nProject: ${enquiry.projectType || 'General Infrastructure'}\nPreferred Channel: ${enquiry.preferredChannel || 'WhatsApp'}\n\nCustomer Details:\nName: ${enquiry.name}\nPhone: ${enquiry.phone}\nEmail: ${enquiry.email || 'N/A'}\nCompany: ${enquiry.company || 'N/A'}\nLocation: ${enquiry.location || 'N/A'}\n\nQuery Details:\n${enquiry.message || 'N/A'}\n\nSource: ${enquiry.source || 'Website'}`;

    const info = await mailer.sendMail({
      from: `"Ariselux Technical Desk" <${smtp.user}>`,
      to: company.email,
      replyTo: enquiry.email || company.email,
      subject: `Technical Enquiry: ${enquiry.enquiryType || 'Consultation'} - ${enquiry.name} (Ref #${enquiry.id})`,
      text: textContent,
      html: enquirySalesHtml
    });
    console.log(`[ENQUIRY SALES EMAIL SENT]: Delivered to ${company.email} (ID: ${info.messageId})`);
    return { sent: true, messageId: info.messageId };
  } catch (err) {
    console.error(`[ENQUIRY EMAIL ERROR] Failed to send to ${company.email}:`, err.message);
    return { sent: false, error: err.message };
  }
}

/* ==========================================================
   4. CUSTOMER ENQUIRY ACKNOWLEDGMENT EMAIL (sent to customer's inbox)
   Purpose: Official Technical Advisory confirmation receipt to customer
   Style: Exact Same Blue Theme as Enquiry Sales Desk Email
   ========================================================== */
export async function sendCustomerEnquiryAcknowledgment(enquiry) {
  if (!enquiry.email) return { sent: false, reason: 'no_customer_email' };

  const currentConfig = getConfig();
  const { smtp, company } = currentConfig;
  const mailer = createTransporter(currentConfig);
  if (!mailer) return { sent: false, reason: 'missing_credentials' };

  const customerEnquiryHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:'Segoe UI',Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:35px 0;">
    <tr><td align="center">
      <table width="640" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 4px 15px rgba(0,0,0,0.06);">

        <!-- HEADER: BRANDED BANNER -->
        <tr>
          <td style="background:linear-gradient(135deg, #0b1e36 0%, #13325c 100%);padding:26px 32px;border-bottom:4px solid #1b5faa;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <span style="display:inline-block;background:#1b5faa;color:#ffffff;font-size:11px;font-weight:800;letter-spacing:1.5px;padding:4px 10px;border-radius:4px;text-transform:uppercase;margin-bottom:8px;">
                    ARISELUX EQUIPMENTS PVT LTD
                  </span>
                  <h1 style="margin:0;font-size:22px;color:#ffffff;font-weight:800;letter-spacing:-0.5px;">Technical Enquiry Received</h1>
                  <p style="margin:6px 0 0;font-size:13px;color:#e0f2fe;">Factory Technical &amp; Application Desk &bull; Roorkee Works</p>
                </td>
                <td align="right" style="vertical-align:top;">
                  <div style="background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.22);border-radius:8px;padding:8px 16px;text-align:center;">
                    <div style="font-size:10px;color:#e0f2fe;font-weight:700;letter-spacing:1px;text-transform:uppercase;">ENQUIRY REF</div>
                    <div style="font-size:15px;font-weight:800;color:#ffffff;font-family:monospace;margin-top:2px;">#${enquiry.id}</div>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- SUB BANNER -->
        <tr>
          <td style="background:#f0f9ff;padding:18px 32px;border-bottom:1px solid #bae6fd;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="width:65%;">
                  <span style="font-size:11px;font-weight:700;color:#0369a1;text-transform:uppercase;letter-spacing:1px;">Nature of Enquiry</span>
                  <h2 style="margin:4px 0 0;font-size:20px;font-weight:800;color:#0c4a6e;">${enquiry.enquiryType || 'Technical Consultation'}</h2>
                </td>
                <td style="width:35%;text-align:right;">
                  <span style="font-size:11px;font-weight:700;color:#0369a1;text-transform:uppercase;letter-spacing:1px;">Preferred Channel</span>
                  <div style="margin-top:4px;font-size:14px;font-weight:800;color:#0369a1;background:#ffffff;padding:4px 12px;border-radius:6px;display:inline-block;border:1px solid #7dd3fc;">
                    ${enquiry.preferredChannel || 'WhatsApp'}
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- CONTENT -->
        <tr>
          <td style="padding:28px 32px;">
            <p style="margin:0 0 14px;font-size:15px;color:#1e293b;">Dear <strong>${enquiry.name}</strong>,</p>
            <p style="margin:0 0 20px;font-size:14px;color:#475569;line-height:1.7;">
              Thank you for consulting with <strong>Ariselux Equipments Private Limited</strong>. Our factory technical sales engineering team at <strong>Roorkee Works</strong> has received your inquiry regarding:
            </p>

            <!-- TOPIC HIGHLIGHT -->
            <div style="background:#eff6ff;border:1px solid #bfdbfe;border-left:5px solid #1b5faa;border-radius:8px;padding:18px 22px;margin:0 0 24px;">
              <div style="font-size:11px;font-weight:800;color:#0369a1;letter-spacing:1px;text-transform:uppercase;margin-bottom:4px;">Enquiry Subject / Model</div>
              <div style="font-size:22px;font-weight:800;color:#0c4a6e;">${enquiry.product}</div>
              <div style="font-size:13px;color:#1e40af;margin-top:4px;">Nature: <strong>${enquiry.enquiryType || 'Technical Consultation'}</strong></div>
            </div>

            <!-- ITEMIZED ENQUIRY BREAKDOWN -->
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:18px 20px;margin-bottom:24px;">
              <div style="font-size:11px;font-weight:800;color:#64748b;letter-spacing:1px;text-transform:uppercase;margin-bottom:12px;">Your Submission Details</div>
              <table width="100%" cellpadding="6" cellspacing="0" style="font-size:13px;color:#334155;">
                <tr>
                  <td width="40%" style="font-weight:700;color:#64748b;border-bottom:1px solid #f1f5f9;">Nature of Enquiry:</td>
                  <td style="border-bottom:1px solid #f1f5f9;"><strong>${enquiry.enquiryType}</strong></td>
                </tr>
                <tr>
                  <td style="font-weight:700;color:#64748b;border-bottom:1px solid #f1f5f9;">Product / Series:</td>
                  <td style="border-bottom:1px solid #f1f5f9;font-weight:700;color:#1e40af;">${enquiry.product}</td>
                </tr>
                <tr>
                  <td style="font-weight:700;color:#64748b;border-bottom:1px solid #f1f5f9;">Application / Site:</td>
                  <td style="border-bottom:1px solid #f1f5f9;">${enquiry.projectType || 'General Infrastructure'}</td>
                </tr>
                <tr>
                  <td style="font-weight:700;color:#64748b;border-bottom:1px solid #f1f5f9;">Preferred Channel:</td>
                  <td style="border-bottom:1px solid #f1f5f9;font-weight:700;color:#1e40af;">${enquiry.preferredChannel || 'WhatsApp'}</td>
                </tr>
                ${enquiry.company ? `
                <tr>
                  <td style="font-weight:700;color:#64748b;border-bottom:1px solid #f1f5f9;">Company / Org:</td>
                  <td style="border-bottom:1px solid #f1f5f9;">${enquiry.company}</td>
                </tr>` : ''}
                <tr>
                  <td style="font-weight:700;color:#64748b;vertical-align:top;">Your Query:</td>
                  <td style="white-space:pre-wrap;line-height:1.5;">${enquiry.message}</td>
                </tr>
              </table>
            </div>

            <!-- OUR COMMITMENT -->
            <div style="background:#f8fafc;border-radius:8px;padding:20px;margin-bottom:24px;border:1px solid #e2e8f0;">
              <div style="font-size:12px;font-weight:800;color:#1e293b;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:12px;">What Happens Next</div>
              <p style="margin:0 0 10px;font-size:13px;color:#475569;line-height:1.6;">
                An application engineer specializing in your sector will analyze your requirements and connect with you via <strong>${enquiry.preferredChannel || 'WhatsApp'}</strong> within <strong>2 to 4 business hours</strong> with verified specifications and technical guidance.
              </p>
            </div>

            <!-- INSTANT ASSISTANCE -->
            <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:16px 20px;">
              <div style="font-size:13px;font-weight:700;color:#1e40af;margin-bottom:6px;">Need Direct Phone Consultation?</div>
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right:20px;font-size:13px;">
                    📞 <a href="tel:+918923730881" style="color:#2563eb;font-weight:700;text-decoration:none;">+91 89237 30881</a>
                  </td>
                  <td style="font-size:13px;">
                    💬 <a href="https://wa.me/918923730881" target="_blank" style="color:#16a34a;font-weight:700;text-decoration:none;">Chat on WhatsApp (+91 89237 30881)</a>
                  </td>
                </tr>
              </table>
            </div>

          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background:#f8fafc;padding:22px 32px;text-align:center;border-top:1px solid #e2e8f0;">
            <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#0f172a;">Ariselux Equipments Private Limited</p>
            <p style="margin:0 0 6px;font-size:12px;color:#64748b;">${company.address}</p>
            <p style="margin:0;font-size:12px;color:#64748b;">
              <a href="mailto:${smtp.user}" style="color:#1b5faa;text-decoration:none;">${smtp.user}</a> &bull;
              <a href="https://ariselux.com" style="color:#1b5faa;text-decoration:none;">ariselux.com</a> &bull; Direct: <a href="tel:+918923730881" style="color:#1b5faa;font-weight:700;text-decoration:none;">+91 89237 30881</a> &bull; WhatsApp: <a href="https://wa.me/918923730881" target="_blank" style="color:#16a34a;font-weight:700;text-decoration:none;">+91 89237 30881</a> &bull; Toll-Free: <a href="tel:18002025104" style="color:#64748b;text-decoration:none;">1800 202 5104</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  try {
    const textContent = `Dear ${enquiry.name},\n\nThank you for consulting with Ariselux Equipments Private Limited.\nOur factory technical engineering desk at Roorkee Works has received your inquiry regarding ${enquiry.product} (Nature: ${enquiry.enquiryType || 'Technical Consultation'}, Ref #${enquiry.id}).\n\nAn application engineer will reach out via your preferred channel (${enquiry.preferredChannel || 'WhatsApp'}) within 2-4 business hours.\n\nDirect Factory Desk:\nPhone: ${company.phone}\nWhatsApp: https://wa.me/${company.whatsapp}\nEmail: ${smtp.user}\n\nAriselux Equipments Private Limited\nRoorkee Works, Uttarakhand, India`;

    const delivery = await sendMailWithRetry(currentConfig, mailer, {
      from: `"Ariselux Equipments" <${smtp.user}>`,
      to: enquiry.email,
      replyTo: smtp.user,
      subject: `Technical Enquiry Received: ${enquiry.enquiryType || 'Consultation'} (Ref #${enquiry.id}) - Ariselux Equipments`,
      text: textContent,
      html: customerEnquiryHtml
    }, enquiry.email);

    if (delivery.sent) {
      console.log(`[CUSTOMER ENQUIRY ACK SENT]: Accepted for ${enquiry.email} (ID: ${delivery.messageId}, attempt ${delivery.attempts})`);
    } else {
      console.error(`[ENQUIRY ACK EMAIL ERROR] Failed to send to ${enquiry.email}:`, delivery.error || delivery.reason);
    }
    return delivery;
  } catch (err) {
    console.error(`[ENQUIRY ACK EMAIL ERROR] Failed to send to ${enquiry.email}:`, err.message);
    return { sent: false, error: err.message };
  }
}

/* ==========================================================
   5. BACKWARD-COMPATIBLE WRAPPERS
   ========================================================== */
export async function sendInquiryNotification(item) {
  if (item.entryType === 'quotation' || item.id?.startsWith('RFQ-') || item.quantity) {
    return sendQuotationNotification(item);
  }
  return sendEnquiryNotification(item);
}

export async function sendCustomerAcknowledgment(item) {
  if (item.entryType === 'quotation' || item.id?.startsWith('RFQ-') || item.quantity) {
    return sendCustomerQuotationAcknowledgment(item);
  }
  return sendCustomerEnquiryAcknowledgment(item);
}

/* ==========================================================
   6. CAREER APPLICATION SALES/HR NOTIFICATION (with Resume)
   ========================================================== */
export async function sendCareerApplicationNotification(application, file) {
  const currentConfig = getConfig();
  const { smtp, company } = currentConfig;
  const mailer = createTransporter(currentConfig);

  const cleanPhone = (application.phone || '').replace(/[^0-9]/g, '');
  const waCandidateText = encodeURIComponent(
    `Hello ${application.fullName}, regarding your application for ${application.role} at Ariselux Equipments (Ref #${application.id}):\nOur team is reviewing your profile...`
  );

  const fileSizeMb = file ? (file.size / (1024 * 1024)).toFixed(2) : '0';

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#0f172a;font-family:'Segoe UI',Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;padding:35px 0;">
    <tr><td align="center">
      <table width="640" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.3);">
        <!-- HEADER -->
        <tr>
          <td style="background:linear-gradient(135deg, #0b1e36 0%, #13325c 100%);padding:26px 32px;border-bottom:4px solid #f47920;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <span style="display:inline-block;background:#f47920;color:#ffffff;font-size:11px;font-weight:800;letter-spacing:1.5px;padding:4px 10px;border-radius:4px;text-transform:uppercase;margin-bottom:8px;">
                    CAREER APPLICATION &bull; RESUME ATTACHED
                  </span>
                  <h1 style="margin:0;font-size:22px;color:#ffffff;font-weight:800;letter-spacing:-0.5px;">New Job Application Received 📄</h1>
                  <p style="margin:6px 0 0;font-size:13px;color:#e0f2fe;">Ariselux Equipments &bull; Roorkee Works Talent Acquisition</p>
                </td>
                <td align="right" style="vertical-align:top;">
                  <div style="background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.22);border-radius:8px;padding:8px 16px;text-align:center;">
                    <div style="font-size:10px;color:#e0f2fe;font-weight:700;letter-spacing:1px;text-transform:uppercase;">APPLICATION ID</div>
                    <div style="font-size:15px;font-weight:800;color:#ffffff;font-family:monospace;margin-top:2px;">#${application.id}</div>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ROLE BANNER -->
        <tr>
          <td style="background:#f0f9ff;padding:18px 32px;border-bottom:1px solid #bae6fd;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="width:65%;">
                  <span style="font-size:11px;font-weight:700;color:#0369a1;text-transform:uppercase;letter-spacing:1px;">Target Position / Role</span>
                  <h2 style="margin:4px 0 0;font-size:20px;font-weight:800;color:#0c4a6e;">${application.role}</h2>
                </td>
                <td style="width:35%;text-align:right;">
                  <span style="font-size:11px;font-weight:700;color:#0369a1;text-transform:uppercase;letter-spacing:1px;">Experience</span>
                  <div style="margin-top:4px;font-size:15px;font-weight:800;color:#0369a1;background:#ffffff;padding:4px 12px;border-radius:6px;display:inline-block;border:1px solid #7dd3fc;">
                    ${application.experience || 'Not specified'}
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- CANDIDATE DETAILS -->
        <tr>
          <td style="padding:26px 32px;">
            <div style="font-size:12px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:1px;margin-bottom:14px;">Candidate Profile</div>
            <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse:collapse;border:1px solid #e2e8f0;border-radius:8px;font-size:14px;">
              <tr style="background:#f8fafc;border-bottom:1px solid #e2e8f0;">
                <td style="width:32%;font-weight:700;color:#475569;">Full Name:</td>
                <td style="font-weight:800;color:#0f172a;">${application.fullName}</td>
              </tr>
              <tr style="border-bottom:1px solid #e2e8f0;">
                <td style="font-weight:700;color:#475569;">Email Address:</td>
                <td><a href="mailto:${application.email}" style="color:#1b5faa;font-weight:600;text-decoration:none;">${application.email}</a></td>
              </tr>
              <tr style="background:#f8fafc;border-bottom:1px solid #e2e8f0;">
                <td style="font-weight:700;color:#475569;">Phone Number:</td>
                <td>
                  <a href="tel:${application.phone}" style="color:#1b5faa;font-weight:700;text-decoration:none;">${application.phone}</a>
                  ${cleanPhone ? `&nbsp;&bull;&nbsp;<a href="https://wa.me/${cleanPhone}?text=${waCandidateText}" target="_blank" style="color:#25D366;font-weight:700;text-decoration:none;">Chat on WhatsApp &rarr;</a>` : ''}
                </td>
              </tr>
              <tr style="border-bottom:1px solid #e2e8f0;">
                <td style="font-weight:700;color:#475569;">Resume File:</td>
                <td style="color:#0f172a;">
                  <strong>${file ? file.originalname : 'No file attached'}</strong>
                  ${file ? `<span style="color:#64748b;font-size:12px;"> (${fileSizeMb} MB) &bull; Attached below</span>` : ''}
                </td>
              </tr>
              ${application.summary ? `
              <tr style="background:#f8fafc;">
                <td style="font-weight:700;color:#475569;vertical-align:top;">Profile Summary / Notes:</td>
                <td style="color:#334155;line-height:1.6;white-space:pre-wrap;">${application.summary}</td>
              </tr>` : ''}
            </table>

            <div style="margin-top:24px;padding:16px;background:#fef3c7;border:1px solid #fde68a;border-radius:8px;font-size:13px;color:#92400e;">
              <strong>📎 Resume Attachment:</strong> The candidate's resume has been attached to this email. You can directly preview or download the file from your mail client.
            </div>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background:#f8fafc;padding:18px 32px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;text-align:center;">
            Ariselux Equipments Private Limited &bull; LATIFPUR, Bhagwanpur - Roorkee, Uttarakhand &bull; Tel: <a href="tel:+918923730881" style="color:#64748b;text-decoration:none;">+91 89237 30881</a>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
  `;

  if (!mailer) {
    console.log(`[SMTP SIMULATED] Career Application #${application.id} from ${application.fullName} (${application.role})`);
    return { sent: false, simulated: true };
  }

  const attachments = [];
  if (file && file.buffer) {
    attachments.push({
      filename: file.originalname || 'Resume.pdf',
      content: file.buffer,
      contentType: file.mimetype || 'application/pdf'
    });
  }

  try {
    const textContent = `New Job Application Received (Ref #${application.id})\n\nCandidate: ${application.fullName}\nRole Applied: ${application.role}\nPhone: ${application.phone}\nEmail: ${application.email}\nExperience: ${application.experience || 'N/A'}\n\nSummary:\n${application.summary || 'N/A'}\n\nResume attached: ${file ? file.originalname : 'None'}`;

    const info = await mailer.sendMail({
      from: `"${currentConfig.company.name}" <${smtp.fromEmail}>`,
      to: company.email,
      replyTo: application.email,
      subject: `Job Application: ${application.role} - ${application.fullName} (Ref #${application.id})`,
      text: textContent,
      html: html,
      attachments: attachments
    });
    console.log(`[CAREER APPLICATION EMAIL SENT]: Delivered to ${company.email} (ID: ${info.messageId})`);
    return { sent: true, messageId: info.messageId };
  } catch (err) {
    console.error(`[CAREER EMAIL ERROR] Failed to send to ${company.email}:`, err.message);
    return { sent: false, error: err.message };
  }
}

export async function sendApplicantAcknowledgment(application) {
  const currentConfig = getConfig();
  const { smtp, company } = currentConfig;
  const mailer = createTransporter(currentConfig);

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:'Segoe UI',Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:35px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 4px 15px rgba(0,0,0,0.06);">
        <tr>
          <td style="background:#0b1e36;padding:26px 32px;border-bottom:3px solid #1b5faa;">
            <h1 style="margin:0;font-size:22px;color:#ffffff;font-weight:800;">Application Received &bull; Ariselux Equipments</h1>
            <p style="margin:6px 0 0;font-size:13px;color:#94a3b8;">Ref #${application.id}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 32px;font-size:14.5px;line-height:1.7;color:#334155;">
            <p>Dear <strong>${application.fullName}</strong>,</p>
            <p>Thank you for applying for the position of <strong>${application.role}</strong> at <strong>Ariselux Equipments Private Limited</strong>.</p>
            <p>We have successfully received your application and resume. Our engineering and talent acquisition team will carefully review your qualifications and relevant experience. If your profile matches our requirements, we will reach out to schedule an interview.</p>
            <div style="background:#f1f5f9;padding:16px 20px;border-radius:8px;margin:20px 0;font-size:13.5px;">
              <strong>Application Summary:</strong><br>
              &bull; Role Applied: <strong>${application.role}</strong><br>
              &bull; Application ID: <strong>#${application.id}</strong><br>
              &bull; Date Submitted: <strong>${new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })}</strong>
            </div>
            <p>If you have any questions or additional documents to share, feel free to call us at <a href="tel:+918923730881" style="color:#1b5faa;font-weight:700;text-decoration:none;">+91 89237 30881</a>, WhatsApp us at <a href="https://wa.me/918923730881" target="_blank" style="color:#16a34a;font-weight:700;text-decoration:none;">+91 89237 30881</a>, or reply to this email.</p>
            <p style="margin-top:25px;">Best regards,<br><strong>Talent Acquisition Team</strong><br>Ariselux Equipments Private Limited<br>Bhagwanpur - Roorkee, Uttarakhand, India</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
  `;

  if (!mailer || !application.email) {
    return { sent: false, simulated: true };
  }

  try {
    const textContent = `Dear ${application.fullName},\n\nThank you for applying for the position of ${application.role} at Ariselux Equipments Private Limited (Application ID: #${application.id}).\n\nWe have received your application and resume. Our engineering and talent acquisition team will review your qualifications and reach out if your profile matches our requirements.\n\nBest regards,\nTalent Acquisition Team\nAriselux Equipments Private Limited\nRoorkee Works, Uttarakhand, India`;

    const info = await mailer.sendMail({
      from: `"${currentConfig.company.name}" <${smtp.fromEmail}>`,
      to: application.email,
      replyTo: 'sales@ariselux.com',
      subject: `Application Received: ${application.role} (Ref #${application.id}) - Ariselux Equipments`,
      text: textContent,
      html: html
    });
    return { sent: true, messageId: info.messageId };
  } catch (err) {
    console.error(`[APPLICANT ACK ERROR] Failed to send to ${application.email}:`, err.message);
    return { sent: false, error: err.message };
  }
}

