import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { submitCareerApplication, getAllApplications, getSingleApplication } from '../controllers/careerController.js';
import { requireAdmin } from '../middleware/adminAuth.js';

const router = Router();

// Configure Multer for memory storage with 10 MB limit
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10 Megabytes
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    const allowedMimeTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/octet-stream'
    ];

    if (allowedExtensions.includes(ext) || allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      const err = new Error('Invalid file format. Please upload your resume in PDF or DOC/DOCX format.');
      err.status = 400;
      cb(err);
    }
  }
});

// Middleware to gracefully catch Multer limit errors and return friendly JSON
function handleUpload(req, res, next) {
  upload.single('resume')(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'Resume file is too large! Maximum allowed size is 10 MB. Please choose a smaller file.'
        });
      }
      return res.status(400).json({
        success: false,
        message: err.message || 'File upload failed. Please verify your file and try again.'
      });
    }
    next();
  });
}

// Routes
router.post('/', handleUpload, submitCareerApplication);
router.get('/', requireAdmin, getAllApplications);
router.get('/:id', requireAdmin, getSingleApplication);

export default router;
