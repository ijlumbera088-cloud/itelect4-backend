import express, { Router } from 'express';
import { users } from '../store/memory.js';
import { authMiddleware } from '../middleware/auth.js';

const router: Router = express.Router();

router.get('/', authMiddleware, (_req, res) => {
  return res.json(users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  })));
});

export default router;
