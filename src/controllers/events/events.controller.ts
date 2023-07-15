import { Request, Response } from 'express';
import eventsService from '../../services/events.service';
import { errorHandler } from '../../utils/ErrorHandler';
class EventsController {
  create(req: Request, res: Response) {
    const { title, date } = req.body;
    eventsService
      .create(title, date)
      .then((message) => {
        return res.status(200).json({ code: 200, message });
      })
      .catch((e) => {
        errorHandler(res, e.message);
      });
  }
  getAll(req: Request, res: Response) {
    eventsService
      .getAll()
      .then((events) => {
        return res.status(200).send(events);
      })
      .catch((e) => {
        errorHandler(res, e.message);
      });
  }
  getOne(req: Request, res: Response) {
    const { eventId } = req.params;
    if (!eventId) throw Error('MISSING_ID');
    eventsService
      .getOne(eventId)
      .then((event) => {
        return res.status(200).send(event);
      })
      .catch((e) => {
        errorHandler(res, e.message);
      });
  }
  delete(req: Request, res: Response) {
    const { eventId } = req.params;
    if (!eventId) throw Error('MISSING_ID');
    eventsService
      .deleteOne(eventId)
      .then((message) => {
        return res.status(200).json({ code: 200, message });
      })
      .catch((e) => {
        errorHandler(res, e.message);
      });
  }
}
export default new EventsController();
