import logger from '../common/logger';
import Events, { Event } from '../datamodels/Events';
import Tickets from '../datamodels/Tickets';
import TicketsFlow, { OperationTypes } from '../datamodels/TicketsFlow';
export class EventsService {
  async create(title: string, date: Date): Promise<string> {
    const created = await Events.create({
      title,
      date,
    }).catch((err) => {
      logger.error(JSON.stringify(err));
    });
    if (!created) throw Error('CREATE_ERROR');
    return 'Event created succesfull';
  }
  async getAll() {
    const events = await Events.find().lean();
    for (const event of events) {
      const [tickets, ticketsGiven, ticketsReceived] = await Promise.all([
        Tickets.find({ event: event._id }).lean(),
        TicketsFlow.find({
          event: event._id,
          type: OperationTypes.GIVE,
        }).lean(),
        TicketsFlow.find({
          event: event._id,
          type: OperationTypes.RECEIVE,
        }).lean(),
      ]);
      event.totalTickets = tickets.reduce((acc, ticket) => acc + ticket.quantity, 0);
      event.totalGivenTickets = ticketsGiven.reduce((acc, ticket) => acc + ticket.quantity, 0);
      event.totalReceivedTickets = ticketsReceived.reduce(
        (acc, ticket) => acc + ticket.quantity,
        0
      );
    }
    return events;
  }
  async getOne(id: string): Promise<Event> {
    const [event, tickets] = await Promise.all([
      Events.findById(id).lean(),
      Tickets.find({ event: id }).lean(),
    ]);
    if (!event) throw Error('DATA_NOT_FOUND');
    return { ...event, tickets };
  }
  async deleteOne(id: string): Promise<string> {
    const tickets = await Tickets.find({ event: id }).lean();
    if (!tickets.length) {
      const eventDelete = await Events.findOneAndDelete({ _id: id });

      if (!eventDelete) throw Error('NO_PARTY_EXISTS');
    } else throw Error('DELETE_EVENT_WITH_TICKETS');

    return 'Event deleted succesfull';
  }

  async updateEvent(id: string, title?: string, date?: Date): Promise<string> {
    const eventUpdated = await Events.findOneAndUpdate({ _id: id }, { title, date });

    if (!eventUpdated) throw Error('NO_EVENT_UPDATED');

    return 'Event updated succesfull';
  }
}
export default new EventsService();
