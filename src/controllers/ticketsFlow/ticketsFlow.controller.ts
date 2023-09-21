import { Request, Response } from 'express';
import { errorHandler } from '../../utils/ErrorHandler';
import ticketsFlowService from '../../services/ticketsFlow.service';

class TicketsFlowController {
  createTicketFlow(req: Request, res: Response) {
    const {
      seller,
      quantity,
      type,
      ticket,
      event,
      date,
      step,
      paymentMethod,
      methodOperation,
      moneyReceived,
    } = req.body;
    ticketsFlowService
      .create(
        seller,
        quantity,
        type,
        ticket,
        event,
        date,
        step,
        paymentMethod,
        methodOperation,
        moneyReceived
      )
      .then((message) => {
        return res.status(200).json({ code: 200, message });
      })
      .catch((e) => {
        errorHandler(res, e.message);
      });
  }
  getAllTicketsFlow(req: Request, res: Response) {
    ticketsFlowService
      .getAllTicketsFlow()
      .then((message) => {
        return res.status(200).json({ code: 200, message });
      })
      .catch((e) => {
        errorHandler(res, e.message);
      });
  }
  getOneTicketFlow(req: Request, res: Response) {
    const { id } = req.params;
    ticketsFlowService
      .getOneTicketFlow(id)
      .then((message) => {
        return res.status(200).json({ code: 200, message });
      })
      .catch((e) => {
        errorHandler(res, e.message);
      });
  }
  getTicketsFlowBySeller(req: Request, res: Response) {
    const { id } = req.params;
    const { event } = req.query;
    ticketsFlowService
      .getTicketsFlowBySeller(id, event)
      .then((message) => {
        return res.status(200).json({ code: 200, message });
      })
      .catch((e) => {
        errorHandler(res, e.message);
      });
  }
  getTicketsFlowBySellerType(req: Request, res: Response) {
    const { id } = req.params;
    const { event, ticket, step } = req.query;
    ticketsFlowService
      .getTicketsFlowBySellerType(id, event, ticket, step)
      .then((message) => {
        return res.status(200).json({ code: 200, message });
      })
      .catch((e) => {
        errorHandler(res, e.message);
      });
  }
  getTicketsFlowByEvent(req: Request, res: Response) {
    const { id } = req.params;
    ticketsFlowService
      .getTicketsFlowByEvent(id)
      .then((message) => {
        return res.status(200).json({ code: 200, message });
      })
      .catch((e) => {
        errorHandler(res, e.message);
      });
  }
}
export default new TicketsFlowController();
