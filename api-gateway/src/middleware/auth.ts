import { Request } from 'express';
import jwt from 'jsonwebtoken';

export function verifyToken(req: Request) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  const token = authHeader.replace('Bearer ', '');
  try {
    return jwt.verify(token, process.env.JWT_SECRET || '');
  } catch {
    return null;
  }
}
