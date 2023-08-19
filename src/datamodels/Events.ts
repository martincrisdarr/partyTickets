import mongoose from 'mongoose';
import { Ticket } from './Tickets';

export interface Event {
  _id: mongoose.Types.ObjectId;
  title: string;
  date: Date;
  tickets?: Ticket[];
  totalTickets?: number;
  totalGivenTickets?: number;
  totalReceivedTickets?: number;
}

const schema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  date: { type: Date, required: true, index: true },
});

export default mongoose.model<Event>('Events', schema);
