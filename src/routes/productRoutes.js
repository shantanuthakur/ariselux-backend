import { Router } from 'express';
import { 
  getAllProducts, 
  getProductById, 
  getCategories, 
  downloadProductSpecSheet 
} from '../controllers/productController.js';

const router = Router();

router.get('/', getAllProducts);
router.get('/categories', getCategories);
router.get('/:id/spec-sheet', downloadProductSpecSheet);
router.get('/:id', getProductById);

export default router;
