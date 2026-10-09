import { Router } from 'express';
import { createQuotation, getAllQuotations, getSingleQuotation, changeInquiryStatus } from '../controllers/inquiryController.js';
import { requireAdmin } from '../middleware/adminAuth.js';

const router = Router();

router.post('/', createQuotation);
router.get('/', requireAdmin, getAllQuotations);
router.get('/:id', requireAdmin, getSingleQuotation);
router.patch('/:id/status', requireAdmin, changeInquiryStatus);

export default router;
