import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendDataPath = path.resolve(__dirname, '../../ariselux-frontend/src/products-data.js');
const backendDataPath = path.resolve(__dirname, '../src/data/products.js');

const frontendCode = fs.readFileSync(frontendDataPath, 'utf8');

const extraCode = `

export const products = Object.values(productsData);

export const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'battery', name: 'Battery Powered' },
  { id: 'diesel', name: 'Diesel Powered' },
  { id: 'solar', name: 'Solar Powered' },
  { id: 'without-genset', name: 'Without Genset' },
  { id: 'petrol', name: 'Petrol Powered' },
  { id: 'hybrid', name: 'Battery-Petrol Hybrid' },
  { id: 'inflatable', name: 'Inflatable Tower' }
];
`;

fs.writeFileSync(backendDataPath, frontendCode + extraCode, 'utf8');
console.log('Successfully synced products to backend!');
