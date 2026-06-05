import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { searchRoutes } from './routes/search.routes.js';
import { detailsRoutes } from './routes/details.routes.js';
import { aggregateRoutes } from './routes/aggregate.routes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/search', searchRoutes);
app.use('/api/details', detailsRoutes);
app.use('/api/aggregate', aggregateRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.json({
    name: 'SECOP Web App API',
    version: '1.0.0',
    endpoints: {
      search: 'POST /api/search',
      details: 'GET /api/details/:processId',
      aggregate: 'POST /api/aggregate',
      health: 'GET /health',
    },
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
});