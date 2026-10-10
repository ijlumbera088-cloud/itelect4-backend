import bcrypt from 'bcryptjs';
import express, { Router } from 'express';
import jwt from 'jsonwebtoken';
import { users } from '../store/memory.js';
import { AuthPayload, User } from '../types/index.js';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';

const router: Router = express.Router();

const getJwt = (user: Pick<User, 'id' | 'email'>) => {
  const secret = process.env.JWT_SECRET || 'dev-secret';
  return jwt.sign({ userId: user.id, email: user.email } as AuthPayload, secret, { expiresIn: '7d' });
};

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body ?? {};

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  const exists = users.some((user) => user.email.toLowerCase() === normalizedEmail);

  if (exists) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(String(password), 10);
  const newUser: User = {
    id: users.reduce((max, user) => Math.max(max, user.id), 0) + 1,
    name: String(name).trim(),
    email: normalizedEmail,
    password: hashedPassword,
    role: 'STUDENT',
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);

  const token = getJwt({ id: newUser.id, email: newUser.email });

  return res.status(201).json({
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    token,
  });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  const user = users.find((entry) => entry.email.toLowerCase() === normalizedEmail);

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  const isPasswordValid = user.password.startsWith('$2')
    ? await bcrypt.compare(String(password), user.password)
    : user.password === String(password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  const token = getJwt({ id: user.id, email: user.email });

  return res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    token,
  });
});

router.get('/me', authMiddleware, (req: AuthRequest, res) => {
  const user = users.find((entry) => entry.id === req.userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  return res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
});

router.get('/', authMiddleware, (_req, res) => {
  return res.json(users.map(({ password, ...user }) => user));
});

export default router;
