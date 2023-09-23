import jwt from 'jsonwebtoken';
import settings from '../settings';

const signer = (data: object, key: string): string => {
  return jwt.sign(data, key, { expiresIn: settings.tokenExpiry });
};

export const AuthSigner = (user: object): string => {
  return signer({ ...user, tokenType: 'auth' }, settings.secretKey);
};
