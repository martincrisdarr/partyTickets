import { Request } from 'express';
import { User } from '../datamodels/Users';

export interface RequestCustom extends Request {
  user: User;
}
