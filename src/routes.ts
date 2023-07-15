import { Application } from 'express';
import authRoutes from './controllers/auth/auth.routes';
import eventsRoutes from './controllers/events/events.routes';
export default function routes(app: Application): void {
  app.use('/api/auth', authRoutes);
  app.use('/api/events', eventsRoutes);
}
