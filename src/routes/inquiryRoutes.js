import { Router } from 'express';
import { createInquiry, getAllInquiries, getSingleInquiry, changeInquiryStatus } from '../controllers/inquiryController.js';
import { requireAdmin } from '../middleware/adminAuth.js';

const router = Router();

router.post('/', createInquiry);
router.get('/', requireAdmin, getAllInquiries);
router.get('/:id', requireAdmin, getSingleInquiry);
router.patch('/:id/status', requireAdmin, changeInquiryStatus);

export default router;
