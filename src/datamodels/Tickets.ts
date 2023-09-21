import mongoose from 'mongoose';
import { Event } from './Events';

export enum TicketTypes {
  VIP = 'VIP',
  GENERAL = 'GENERAL',
  PALCO = 'PALCO',
  FREE = 'FREE',
}

export interface Ticket {
  _id: mongoose.Types.ObjectId;
  type: string;
  quantity: number;
  event: Event | mongoose.Types.ObjectId;
  step: number;
  price: number;
}

const schema = new mongoose.Schema({
  type: { type: String, enum: Object.keys(TicketTypes), required: true },
  quantity: { type: Number, required: true, default: 0 },
  event: { type: mongoose.Schema.ObjectId, ref: 'Events', required: true, index: true },
  step: { type: Number },
  price: { type: Number, required: true },
});

export default mongoose.model<Ticket>('Tickets', schema);
