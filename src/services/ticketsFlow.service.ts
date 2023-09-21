import logger from '../common/logger';
import Events from '../datamodels/Events';
import Sellers from '../datamodels/Sellers';
import Tickets from '../datamodels/Tickets';
import TicketsFlow, { OperationTypes } from '../datamodels/TicketsFlow';

export class TicketsFlowService {
  async create(
    seller: string,
    quantity: number,
    type: string,
    ticket: string,
    event: string,
    date: string,
    step: number,
    paymentMethod?: string,
    methodOperation?: string,
    moneyReceived?: string
  ): Promise<string> {
    const ticketAvailable = await Tickets.findOne({
      type: ticket,
      step: step ? step : 0,
      event: event,
    }).lean();

    //OPERATION TYPE GIVE, WE CHECK IF THERE ARE AVAILABLE TICKETS ON TICKETS MODEL
    if (type === OperationTypes.GIVE) {
      if (!ticketAvailable || +ticketAvailable.quantity - +quantity < 0) {
        throw Error('NO_QUANTITY_TICKETS_AVAILABLE_GIVE');
      }
      await Tickets.updateOne(
        { _id: ticketAvailable._id },
        { quantity: +ticketAvailable.quantity - +quantity }
      );
      const created = await TicketsFlow.create({
        seller,
        type,
        ticket: ticketAvailable._id,
        quantity,
        event,
        date,
      }).catch((err) => {
        logger.error(JSON.stringify(err));
      });
      if (!created) throw Error('CREATE_ERROR');
      return 'Tickets flow created succesfull';
    }
    //OPERATION TPYES RECEIVE, WE CHECK IF THERE ARE NOT MORE QUANTITY TICKETS THAN GIVE ON TICKETSFLOW MODEL
    const sellerTickets = await TicketsFlow.find({
      seller,
      event,
      ticket: ticketAvailable?._id,
    }).lean();
    if (!sellerTickets) throw Error('NO_QUANTITY_TICKETS_AVAILABLE_GIVE');
    let quantityAvailable = -quantity;
    for (const tickets of sellerTickets) {
      if (tickets.type === OperationTypes.GIVE) {
        quantityAvailable = quantityAvailable + +tickets.quantity;
      } else {
        quantityAvailable = quantityAvailable - +tickets.quantity;
      }
    }
    if (quantityAvailable < 0) throw Error('NO_QUANTITY_TICKETS_AVAILABLE_RECEIVE');
    const created = await TicketsFlow.create({
      seller,
      type,
      ticket: ticketAvailable?._id,
      quantity,
      event,
      paymentMethod,
      methodOperation,
      moneyReceived,
      date,
    }).catch((err) => {
      logger.error(JSON.stringify(err));
    });
    if (!created) throw Error('CREATE_ERROR');
    return 'Tickets flow created succesfull';
  }

  async getAllTicketsFlow() {
    const tickets = await TicketsFlow.find()
      .lean()
      .sort({ type: -1 })
      .catch((err) => {
        logger.error(JSON.stringify(err));
      });
    if (!tickets) throw Error('NO_TICKETS_FOUND');
    return tickets;
  }

  async getOneTicketFlow(id: string) {
    const ticket = await TicketsFlow.findById(id)
      .lean()
      .catch((err) => {
        logger.error(JSON.stringify(err));
      });
    if (!ticket) throw Error('NO_TICKETS_FOUND');
    return ticket;
  }

  async getTicketsFlowBySeller(id: string, event: any) {
    const tickets = await TicketsFlow.find({ seller: id, event })
      .sort({ date: 'desc' })
      .lean()
      .catch((err) => {
        logger.error(JSON.stringify(err));
      });
    if (!tickets) throw Error('NO_TICKETS_FOUND_BY_SELLER');
    const completeTickets: object[] = tickets.map(async (ticket) => {
      const e = await Events.findById(ticket.event).lean();
      const ticketFind = await Tickets.findById(ticket.ticket).lean();
      return { ...ticket, event: e, ticket: ticketFind };
    });
    const promiseTickets = await Promise.all(completeTickets).then((values) => {
      return values;
    });

    return promiseTickets;
  }
  async getTicketsFlowBySellerType(id: string, event: any, ticket?: any, step?: any) {
    let filters = {};
    if (ticket || step) {
      const ticketFind = await Tickets.find({ type: ticket, step: Number(step) }).lean();
      if (ticketFind) filters = { ...filters, ticket: ticketFind[0]._id };
    }
    const tickets = await TicketsFlow.find({ seller: id, event, ...filters })
      .sort({ date: 'desc' })
      .lean()
      .catch((err) => {
        logger.error(JSON.stringify(err));
      });
    if (!tickets) throw Error('NO_TICKETS_FOUND_BY_SELLER');
    const completeTickets: object[] = tickets.map(async (ticket) => {
      const e = await Events.findById(ticket.event).lean();
      const ticketFind = await Tickets.findById(ticket.ticket).lean();
      return { ...ticket, event: e, ticket: ticketFind };
    });
    const promiseTickets = await Promise.all(completeTickets).then((values) => {
      return values;
    });

    return promiseTickets;
  }

  async getTicketsFlowByEvent(id: string) {
    const tickets = await TicketsFlow.find({ event: id })
      .lean()
      .catch((err) => {
        logger.error(JSON.stringify(err));
      });
    if (!tickets) throw Error('NO_TICKETS_FOUND');
    const completeTickets: object[] = tickets.map(async (ticket) => {
      const seller = await Sellers.findById(ticket.seller).lean();
      const ticketFind = await Tickets.findById(ticket.ticket).lean();
      return { ...ticket, seller: seller, ticket: ticketFind };
    });
    const promiseTickets = await Promise.all(completeTickets).then((values) => {
      return values;
    });

    return promiseTickets;
  }
}
export default new TicketsFlowService();
