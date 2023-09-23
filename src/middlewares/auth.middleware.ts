import jwt from 'jsonwebtoken';
import { User } from '../datamodels/Users';
import { Request, Response, NextFunction } from 'express';
import Settings from '../settings';
const secret = Settings.secretKey;

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  const tokenHeader = req.headers['authorization'];
  if (!tokenHeader)
    return res.status(401).json({ code: 401, message: 'Unauthorized: No token provided' });
  const token = tokenHeader.replace('Bearer ', '');

  jwt.verify(token, secret, function (err) {
    if (err) return res.status(401).json({ code: 401, message: 'Unauthorized: Invalid token' });
    try {
      const decoded = jwt.verify(token, secret) as { [key: string]: unknown };
      if (decoded.type !== 'ADMIN')
        return res.status(401).json({ code: 401, message: 'Permisos de usuario insuficientes.' });
      req.user = decoded as unknown as User;
      next();
    } catch (ex) {
      return res.status(401).json({ code: 401, message: 'Invalid JWT.' });
    }
  });
};
