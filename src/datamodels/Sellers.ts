import mongoose from 'mongoose';

export interface Seller {
  _id: mongoose.Types.ObjectId;
  name: string;
}

const schema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
});

export default mongoose.model<Seller>('Sellers', schema);
