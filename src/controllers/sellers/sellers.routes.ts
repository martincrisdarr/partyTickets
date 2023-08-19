import express from 'express';
import SellersController from './sellers.controller';
import { adminAuth } from '../../middlewares/auth.middleware';
export default express
  .Router()
  .post('/', adminAuth, SellersController.create)
  .get('/', adminAuth, SellersController.getAllSellers)
  .get('/:id', adminAuth, SellersController.getOneSeller)
  .post('/give', adminAuth, SellersController.giveSellerTickets)
  .post('/receive', adminAuth, SellersController.receiveSellerTickets);
// .get('/:eventId', adminAuth, TicketsController.getOne)
// .delete('/:id', adminAuth, TicketsController.delete);
