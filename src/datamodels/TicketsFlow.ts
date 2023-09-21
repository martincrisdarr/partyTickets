import mongoose from 'mongoose';
import { Event } from './Events';
import { Seller } from './Sellers';
import { Ticket } from './Tickets';

export enum OperationTypes {
  GIVE = 'GIVE',
  RECEIVE = 'RECEIVE',
}

export enum PaymentMethodTypes {
  MERCADOPAGO = 'MERCADOPAGO',
  EFECTIVO = 'EFECTIVO',
}

export interface TicketFlow {
  _id: mongoose.Types.ObjectId;
  seller: Seller | mongoose.Types.ObjectId;
  quantity: number;
  type: string;
  ticket: Ticket | mongoose.Types.ObjectId;
  event: Event | mongoose.Types.ObjectId;
  paymentMethod: string;
  methodOperation: string;
  moneyReceived: string;
  date: string;
}

const schema = new mongoose.Schema({
  type: { type: String, enum: Object.keys(OperationTypes), required: true, index: true },
  seller: { type: mongoose.Schema.ObjectId, ref: 'Sellers', required: true, index: true },
  quantity: { type: Number, required: true },
  ticket: { type: mongoose.Schema.ObjectId, ref: 'Tickets', required: true, index: true },
  event: { type: mongoose.Schema.ObjectId, ref: 'Events', index: true },
  paymentMethod: { type: String, enum: Object.keys(PaymentMethodTypes) },
  moneyReceived: { type: String },
  methodOperation: { type: String },
  date: { type: String, required: true, index: true },
});

schema.index({ type: 1, event: 1 });

export default mongoose.model<TicketFlow>('TicketsFlow', schema);
