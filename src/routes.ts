import { Application } from 'express';
import authRoutes from './controllers/auth/auth.routes';
import eventsRoutes from './controllers/events/events.routes';
import ticketsRoutes from './controllers/tickets/tickets.routes';
import sellersRoutes from './controllers/sellers/sellers.routes';
import ticketsFlowRoutes from './controllers/ticketsFlow/ticketsFlow.routes';
export default function routes(app: Application): void {
  app.use('/api/auth', authRoutes);
  app.use('/api/events', eventsRoutes);
  app.use('/api/tickets', ticketsRoutes);
  app.use('/api/sellers', sellersRoutes);
  app.use('/api/ticketsFlow', ticketsFlowRoutes);
}
