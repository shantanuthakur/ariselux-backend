import fs from 'fs';
import { products, categories, productsData } from '../data/products.js';
import { getSpecSheetFilePath, generateProductSpecPdfBuffer } from '../services/specPdfService.js';

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
      (p.tagline && p.tagline.toLowerCase().includes(q)) ||
      (p.categoryName && p.categoryName.toLowerCase().includes(q)) ||
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
  const product = products.find(p => p.id.toLowerCase() === id.toLowerCase()) || (productsData ? productsData[id.toLowerCase()] : null);

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

// Controller to download technical specification sheet PDF
export function downloadProductSpecSheet(req, res) {
  const { id } = req.params;
  const cleanId = (id || '').toLowerCase().trim();
  const product = products.find(p => p.id.toLowerCase() === cleanId) || 
                  (productsData ? productsData[cleanId] : null) || 
                  { id: cleanId, title: cleanId.toUpperCase() };

  const sanitizedTitle = (product.title || cleanId).replace(/[^a-zA-Z0-9_-]/g, '-');
  const fileName = `Ariselux-${sanitizedTitle}-Specification-Sheet.pdf`;

  // 1. Try serving pre-generated static PDF
  const existingFilePath = getSpecSheetFilePath(cleanId);
  if (existingFilePath) {
    res.setHeader('Content-Type', 'application/pdf');
    return res.download(existingFilePath, fileName, (err) => {
      if (err && !res.headersSent) {
        console.error(`Error downloading spec sheet file for ${cleanId}:`, err);
        return res.status(500).json({
          success: false,
          message: 'Failed to download technical specification sheet.'
        });
      }
    });
  }

  // 2. Generate PDF dynamically on the fly
  try {
    const pdfBuffer = generateProductSpecPdfBuffer(product);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    return res.end(pdfBuffer);
  } catch (err) {
    console.error(`Error generating spec sheet for product ${cleanId}:`, err);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate technical specification sheet.'
    });
  }
}
