import { Router } from 'express';
import { createEnquiry, getAllEnquiries, getSingleEnquiry, changeInquiryStatus } from '../controllers/inquiryController.js';
import { requireAdmin } from '../middleware/adminAuth.js';

const router = Router();

router.post('/', createEnquiry);
router.get('/', requireAdmin, getAllEnquiries);
router.get('/:id', requireAdmin, getSingleEnquiry);
router.patch('/:id/status', requireAdmin, changeInquiryStatus);

export default router;
