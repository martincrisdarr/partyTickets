import logger from '../common/logger';
import Tickets from '../datamodels/Tickets';
import TicketsFlow from '../datamodels/TicketsFlow';

export class TicketsService {
  async create(type: string, quantity: number, event: string, step: number): Promise<string> {
    const ticket = await Tickets.findOne({ type, event, step }).lean();
    if (ticket) {
      await Tickets.updateOne({ _id: ticket._id }, { quantity: +ticket.quantity + +quantity });
    } else {
      const created = await Tickets.create({ type, quantity, event, step }).catch((err) => {
        logger.error(JSON.stringify(err));
      });
      if (!created) throw Error('CREATE_ERROR');
    }
    return 'Tickets created succesfull';
  }

  async getEventTickets(eventId: string) {
    const tickets = await Tickets.find({ event: eventId })
      .lean()
      .sort({ type: -1 })
      .catch((err) => {
        logger.error(JSON.stringify(err));
      });
    if (!tickets) throw Error('NO_TICKETS_FOUND');
    return tickets;
  }

  async getTicketsBySeller(idSeller: number) {
    const tickets = await TicketsFlow.find({ seller: idSeller })
      .populate({ path: 'ticket' })
      .lean()
      .catch((err) => {
        logger.error(JSON.stringify(err));
      });
    if (!tickets) throw Error('NO_TICKETS_FOUND');
    return tickets;
  }

  async updateTicketsQty(eventId: string, quantity: number, type: string): Promise<string> {
    const tickets = await Tickets.findOneAndUpdate({ event: eventId, type }, { quantity }).catch(
      (err) => {
        logger.error(JSON.stringify(err));
      }
    );
    if (!tickets) throw Error('NO_TICKETS_FOUND');
    return 'Tickets updated';
  }

  async getTicketsGiven(eventId: string) {
    const tickets = await TicketsFlow.find({ event: eventId, type: 'GIVE' })
      .lean()
      .catch((err) => {
        logger.error(JSON.stringify(err));
      });
    if (!tickets) throw Error('NO_TICKETS_FOUND');
    return tickets;
  }

  async getTicketsReceived(eventId: string) {
    const tickets = await TicketsFlow.find({ event: eventId, type: 'RECEIVE' })
      .lean()
      .catch((err) => {
        logger.error(JSON.stringify(err));
      });
    if (!tickets) throw Error('NO_TICKETS_FOUND');
    return tickets;
  }
}
export default new TicketsService();
