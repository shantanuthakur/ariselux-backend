import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { config } from './config/index.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import quotationRoutes from './routes/quotationRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';

const app = express();

// The API is normally behind a reverse proxy in production. Trust one proxy
// hop so req.ip resolves to the visitor instead of the shared proxy address.
app.set('trust proxy', 1);

// Middlewares
app.use(cors({
  origin: (origin, callback) => {
    // Browsers omit Origin for same-origin and non-browser requests.
    if (!origin || config.nodeEnv !== 'production' || config.clientOrigins.includes(origin.replace(/\/$/, ''))) {
      return callback(null, true);
    }
    const error = new Error('Origin is not allowed by CORS');
    error.status = 403;
    return callback(error);
  },
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

if (config.nodeEnv !== 'test') {
  app.use(morgan('dev'));
}

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Ariselux Equipments Backend API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});


// API Routes (Dedicated + Legacy Aliases)
app.use('/api/quotations', quotationRoutes);
app.use('/api/rfq', quotationRoutes); // friendly alias for RFQ
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/inquiries', inquiryRoutes); // smart unified router
app.use('/api/contact', inquiryRoutes); // friendly alias for contact form
app.use('/api/products', productRoutes);
app.use('/api/newsletter', newsletterRoutes);

// Root welcome
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Ariselux Equipments API service.',
    documentation: '/api/health'
  });
});

// 404 Not Found Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.method} ${req.originalUrl} not found.`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

export default app;
