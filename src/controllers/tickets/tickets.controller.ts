import { Request, Response } from 'express';
import ticketsService from '../../services/tickets.service';
import { errorHandler } from '../../utils/ErrorHandler';

class TicketsController {
  create(req: Request, res: Response) {
    const { type, quantity, event, step } = req.body;
    ticketsService
      .create(type, quantity, event, step)
      .then((message) => {
        return res.status(200).json({ code: 200, message });
      })
      .catch((e) => {
        errorHandler(res, e.message);
      });
  }
  getEventTickets(req: Request, res: Response) {
    const { eventId } = req.body;
    ticketsService
      .getEventTickets(eventId)
      .then((message) => {
        return res.status(200).json({ code: 200, message });
      })
      .catch((e) => {
        errorHandler(res, e.message);
      });
  }
  getTicketsBySeller(req: Request, res: Response) {
    const { idSeller } = req.body;
    ticketsService
      .getTicketsBySeller(idSeller)
      .then((message) => {
        return res.status(200).json({ code: 200, message });
      })
      .catch((e) => {
        errorHandler(res, e.message);
      });
  }
  updateTicketsQty(req: Request, res: Response) {
    const { eventId, quantity, type } = req.body;
    ticketsService
      .updateTicketsQty(eventId, quantity, type)
      .then((message) => {
        return res.status(200).json({ code: 200, message });
      })
      .catch((e) => {
        errorHandler(res, e.message);
      });
  }
  getTicketsGiven(req: Request, res: Response) {
    const { eventId } = req.body;
    ticketsService
      .getTicketsGiven(eventId)
      .then((message) => {
        return res.status(200).json({ code: 200, message });
      })
      .catch((e) => {
        errorHandler(res, e.message);
      });
  }
  getTicketsReceived(req: Request, res: Response) {
    const { eventId } = req.body;
    ticketsService
      .getTicketsReceived(eventId)
      .then((message) => {
        return res.status(200).json({ code: 200, message });
      })
      .catch((e) => {
        errorHandler(res, e.message);
      });
  }
}
export default new TicketsController();
