import mongoose from 'mongoose';

export interface Event {
  _id: mongoose.Types.ObjectId;
  title: string;
  date: Date;
}

const schema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  date: { type: Date, required: true, index: true },
});

export default mongoose.model<Event>('Events', schema);
