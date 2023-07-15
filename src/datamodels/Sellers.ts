import mongoose from 'mongoose';

export interface Seller {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
}

const schema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  email: { type: String, required: true, index: true, unique: true },
});

export default mongoose.model<Seller>('Sellers', schema);
