import express from 'express';
import eventsController from './events.controller';
import { adminAuth } from '../../middlewares/auth.middleware';
export default express
  .Router()
  .post('/', adminAuth, eventsController.create)
  .get('/', adminAuth, eventsController.getAll)
  .get('/:id', adminAuth, eventsController.getOne)
  .delete('/:id', adminAuth, eventsController.delete)
  .put('/:id', adminAuth, eventsController.updateEvent);
