import cors from 'cors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import { connectDb } from './config/db.js';
import authRoutes from './routes/auth.js';
import itemsRoutes from './routes/items.js';
import usersRoutes from './routes/users.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 4000);

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'itelect4-backend' });
});

app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/users', usersRoutes);
app.use('/api/items', itemsRoutes);
app.use('/items', itemsRoutes);
app.use('/api/submissions', itemsRoutes);
app.use('/submissions', itemsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
});

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);
  res.status(500).json({ message: 'Internal server error', error: error.message });
});

async function startServer() {
  await connectDb();
  app.listen(port, '0.0.0.0', () => {
    console.log(`API running on http://localhost:${port}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
