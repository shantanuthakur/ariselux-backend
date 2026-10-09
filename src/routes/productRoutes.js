import { Router } from 'express';
import { getAllProducts, getProductById, getCategories } from '../controllers/productController.js';

const router = Router();

router.get('/', getAllProducts);
router.get('/categories', getCategories);
router.get('/:id', getProductById);

export default router;
