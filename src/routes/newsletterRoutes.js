import { Router } from 'express';
import { subscribeNewsletter, getSubscribersList } from '../controllers/newsletterController.js';
import { requireAdmin } from '../middleware/adminAuth.js';

const router = Router();

router.post('/', subscribeNewsletter);
router.get('/', requireAdmin, getSubscribersList);

export default router;
