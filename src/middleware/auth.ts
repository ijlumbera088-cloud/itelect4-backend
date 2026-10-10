import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AuthPayload } from '../types/index.js';

export interface AuthRequest extends Request {
  user?: AuthPayload;
  userId?: number;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Access denied. Missing bearer token.' });
    return;
  }

  const token = header.slice('Bearer '.length).trim();
  const secret = process.env.JWT_SECRET || 'dev-secret';

  try {
    const decoded = jwt.verify(token, secret) as AuthPayload;
    req.user = decoded;
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
}
