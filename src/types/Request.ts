import { Request } from 'express';
import { IUser } from '../datamodels/User';

export interface RequestCustom extends Request {
  user: IUser;
}
