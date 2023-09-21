import express from 'express';
import TicketsController from './tickets.controller';
import { adminAuth } from '../../middlewares/auth.middleware';
export default express
  .Router()
  .post('/', adminAuth, TicketsController.create)
  .get('/event/:id', adminAuth, TicketsController.getEventTickets)
  .get('/seller', adminAuth, TicketsController.getTicketsBySeller)
  .get('/given', adminAuth, TicketsController.getTicketsGiven)
  .get('/received', adminAuth, TicketsController.getTicketsReceived)
  .put('/qty', adminAuth, TicketsController.updateTicketsQty);
// .delete('/:id', adminAuth, TicketsController.delete);
