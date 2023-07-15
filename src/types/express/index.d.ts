import fileUpload from 'express-fileupload';
import { IUser } from '../../datamodels/User';
declare module 'express-serve-static-core' {
  interface Request {
    user?: IUser;
    files?: fileUpload.FileArray;
  }
}
