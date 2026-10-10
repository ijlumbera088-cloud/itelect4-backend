import express, { Router } from 'express';
import { submissions } from '../store/memory.js';
import { Submission } from '../types/index.js';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';

const router: Router = express.Router();

const parseStatus = (value?: string) => {
  if (!value) return null;
  const normalized = value.toUpperCase();
  return normalized === 'LOST' || normalized === 'FOUND' ? normalized : null;
};

router.get('/', (req, res) => {
  const status = parseStatus(typeof req.query.status === 'string' ? req.query.status : undefined);
  const list = status ? submissions.filter((item) => item.status === status) : submissions;
  return res.json(list);
});

router.get('/:id', (req, res) => {
  const item = submissions.find((entry) => entry.id === Number(req.params.id));

  if (!item) {
    return res.status(404).json({ message: 'Submission not found.' });
  }

  return res.json(item);
});

router.post('/', authMiddleware, (req, res) => {
  const payload = req.body ?? {};

  if (!payload.title || !payload.description || !payload.category || !payload.location) {
    return res.status(400).json({ message: 'Title, description, category, and location are required.' });
  }

  const newItem: Submission = {
    id: submissions.reduce((max, item) => Math.max(max, item.id), 0) + 1,
    title: String(payload.title).trim(),
    description: String(payload.description).trim(),
    category: String(payload.category).trim(),
    status: payload.status === 'FOUND' ? 'FOUND' : 'LOST',
    location: String(payload.location).trim(),
    userId: Number(payload.userId ?? (req as AuthRequest).userId ?? 0),
    userName: String(payload.userName || 'Unknown User').trim(),
    userEmail: String(payload.userEmail || '').trim(),
    userPhone: String(payload.userPhone || '').trim(),
    imageUrl: payload.imageUrl ?? null,
    createdAt: new Date().toISOString(),
    resolved: Boolean(payload.resolved),
    resolvedAt: payload.resolvedAt ?? null,
  };

  submissions.push(newItem);
  return res.status(201).json(newItem);
});

router.patch('/:id', authMiddleware, (req, res) => {
  const itemIndex = submissions.findIndex((entry) => entry.id === Number(req.params.id));

  if (itemIndex === -1) {
    return res.status(404).json({ message: 'Submission not found.' });
  }

  submissions[itemIndex] = {
    ...submissions[itemIndex],
    ...req.body,
    updatedAt: undefined,
  } as Submission;

  return res.json(submissions[itemIndex]);
});

router.delete('/:id', authMiddleware, (req, res) => {
  const itemIndex = submissions.findIndex((entry) => entry.id === Number(req.params.id));

  if (itemIndex === -1) {
    return res.status(404).json({ message: 'Submission not found.' });
  }

  const [deletedItem] = submissions.splice(itemIndex, 1);
  return res.json({ message: 'Submission deleted.', item: deletedItem });
});

export default router;
