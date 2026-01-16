import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories/userRepository';
import { tokenRepository } from '../repositories/tokenRepository';
import { UnauthorizedError, NotFoundError } from '../../../shared/utils/errors';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'dev-refresh';

export const authService = {
  async register(email: string, password: string, role: 'ADMIN' | 'SELLER' | 'CUSTOMER') {
    const existing = await userRepository.findByEmail(email);
    if (existing) throw new Error('Email already registered');

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await userRepository.createUser(email, passwordHash, role);

    const accessToken = jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ sub: user.id }, JWT_REFRESH_SECRET, { expiresIn: '7d' });

    await tokenRepository.createRefreshToken(user.id, refreshToken, new Date(Date.now() + 7 * 24 * 3600 * 1000));
    return { user, accessToken, refreshToken };
  },

  async login(email: string, password: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new UnauthorizedError('Invalid credentials');

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) throw new UnauthorizedError('Invalid credentials');

    const accessToken = jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ sub: user.id }, JWT_REFRESH_SECRET, { expiresIn: '7d' });

    await tokenRepository.createRefreshToken(user.id, refreshToken, new Date(Date.now() + 7 * 24 * 3600 * 1000));
    return { user, accessToken, refreshToken };
  },

  async refresh(token: string) {
    const stored = await tokenRepository.findRefreshToken(token);
    if (!stored) throw new UnauthorizedError('Invalid refresh token');

    try {
      jwt.verify(token, JWT_REFRESH_SECRET);
    } catch {
      throw new UnauthorizedError('Invalid refresh token');
    }

    const user = await userRepository.findById(stored.userId);
    if (!user) throw new NotFoundError('User');

    await tokenRepository.deleteRefreshToken(token);
    const newAccessToken = jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: '15m' });
    const newRefreshToken = jwt.sign({ sub: user.id }, JWT_REFRESH_SECRET, { expiresIn: '7d' });

    await tokenRepository.createRefreshToken(user.id, newRefreshToken, new Date(Date.now() + 7 * 24 * 3600 * 1000));
    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
};
