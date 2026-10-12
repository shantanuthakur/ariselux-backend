import { saveApplication, getApplications, getApplicationById } from '../services/storageService.js';
import { sendCareerApplicationNotification, sendApplicantAcknowledgment } from '../services/emailService.js';
import { logEmail, logError } from '../services/logService.js';

function asText(val) {
  if (val === undefined || val === null) return '';
  return String(val).trim();
}

/**
 * Handle Career Application Submission with Resume file attachment
 */
export async function submitCareerApplication(req, res) {
  try {
    const fullName = asText(req.body.fullName || req.body.name);
    const email = asText(req.body.email);
    const phone = asText(req.body.phone);
    const role = asText(req.body.role || req.body.jobRole);
    const experience = asText(req.body.experience);
    const summary = asText(req.body.summary);

    // Validation
    if (!fullName) {
      return res.status(400).json({ success: false, message: 'Full Name is required.' });
    }
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'A valid email address is required.' });
    }
    if (!phone) {
      return res.status(400).json({ success: false, message: 'Phone number is required.' });
    }
    if (!role) {
      return res.status(400).json({ success: false, message: 'Please select a role / position.' });
    }

    const file = req.file;
    if (!file) {
      return res.status(400).json({ success: false, message: 'Resume document (PDF/DOC) is required. Please upload your resume.' });
    }

    // 10 MB strict limit (10 * 1024 * 1024 bytes)
    const MAX_RESUME_BYTES = 10 * 1024 * 1024;
    if (file.size > MAX_RESUME_BYTES) {
      return res.status(400).json({
        success: false,
        message: `Resume file is too large (${(file.size / (1024 * 1024)).toFixed(1)} MB). Maximum allowed size is 10 MB. Please upload a smaller file.`
      });
    }

    // Save record
    const application = await saveApplication({
      fullName,
      email,
      phone,
      role,
      experience,
      summary,
      resume: {
        originalName: file.originalname,
        size: file.size,
        mimeType: file.mimetype
      }
    });

    console.log(`[CAREER APPLICATION RECORDED] ID: ${application.id} - ${fullName} for ${role}`);

    // Asynchronously dispatch email notification with resume attachment to sales/HR
    const emailPromise = sendCareerApplicationNotification(application, file)
      .then(result => {
        logEmail('CAREER_APPLICATION', 'sales-desk', result || { sent: false });
      })
      .catch(err => {
        console.error('[CAREER NOTIFICATION FAILED]:', err.message);
        logError('career_notification_email', err.message, { id: application.id, email });
      });

    // Send acknowledgment to applicant
    const ackPromise = sendApplicantAcknowledgment(application)
      .then(result => {
        logEmail('CAREER_ACK', email, result || { sent: false });
      })
      .catch(err => {
        console.error('[CAREER ACK FAILED]:', err.message);
      });

    // In serverless / containers, await promises so connection stays active
    await Promise.allSettled([emailPromise, ackPromise]);

    return res.status(201).json({
      success: true,
      message: `Thank you, ${fullName}! Your application for ${role} has been received along with your resume. Our team will review your profile shortly.`,
      applicationId: application.id,
      candidate: {
        fullName: application.fullName,
        email: application.email,
        role: application.role,
        resumeName: file.originalname
      }
    });
  } catch (err) {
    console.error('Error in submitCareerApplication:', err);
    return res.status(500).json({
      success: false,
      message: 'A server error occurred while processing your application. Please try again or email your resume directly to sales@ariselux.com.'
    });
  }
}

/**
 * Admin: Get all applications
 */
export async function getAllApplications(req, res) {
  try {
    const list = await getApplications();
    return res.json({ success: true, count: list.length, applications: list });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

/**
 * Admin: Get single application by ID
 */
export async function getSingleApplication(req, res) {
  try {
    const app = await getApplicationById(req.params.id);
    if (!app) {
      return res.status(404).json({ success: false, message: 'Application not found.' });
    }
    return res.json({ success: true, application: app });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}
