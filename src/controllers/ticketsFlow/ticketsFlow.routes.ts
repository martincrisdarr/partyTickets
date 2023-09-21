import express from 'express';
import { adminAuth } from '../../middlewares/auth.middleware';
import TicketsFlowController from './ticketsFlow.controller';
export default express
  .Router()
  .post('/', adminAuth, TicketsFlowController.createTicketFlow)
  .get('/', adminAuth, TicketsFlowController.getAllTicketsFlow)
  .get('/:id', adminAuth, TicketsFlowController.getOneTicketFlow)
  .get('/event/:id', adminAuth, TicketsFlowController.getTicketsFlowByEvent)
  .get('/seller/:id', adminAuth, TicketsFlowController.getTicketsFlowBySeller)
  .get('/seller/type/:id', adminAuth, TicketsFlowController.getTicketsFlowBySellerType);
