import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export enum UserTypes {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
export interface User {
  _id: mongoose.Types.ObjectId;
  name: string;
  password: string;
}

const schema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  password: { type: String, required: true, select: false },
  type: { type: String, enum: Object.keys(UserTypes), required: true },
});

schema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  if (!this.password) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error as Error);
  }
});
export default mongoose.model<User>('Users', schema);
