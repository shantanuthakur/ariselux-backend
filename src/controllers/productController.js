import { products, categories } from '../data/products.js';

export function getAllProducts(req, res) {
  const { category, search } = req.query;
  let result = [...products];
  const categoryText = typeof category === 'string' ? category : '';
  const searchText = typeof search === 'string' ? search : '';

  if (categoryText && categoryText !== 'all') {
    result = result.filter(p => p.category.toLowerCase() === categoryText.toLowerCase());
  }

  if (searchText) {
    const q = searchText.toLowerCase();
    result = result.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      (p.lumens && p.lumens.toLowerCase().includes(q))
    );
  }

  return res.json({
    success: true,
    total: result.length,
    data: result
  });
}

export function getProductById(req, res) {
  const { id } = req.params;
  const product = products.find(p => p.id.toLowerCase() === id.toLowerCase());

  if (!product) {
    return res.status(404).json({
      success: false,
      message: `Product with id "${id}" not found.`
    });
  }

  return res.json({
    success: true,
    data: product
  });
}

export function getCategories(req, res) {
  return res.json({
    success: true,
    data: categories
  });
}
