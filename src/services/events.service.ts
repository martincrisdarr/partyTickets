import Events, { Event } from '../datamodels/Events';
import TicketsFlow from '../datamodels/TicketsFlow';
import { OperationTypes } from '../datamodels/TicketsFlow';
import logger from '../common/logger';
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
    return await Events.find().lean();
  }
  async getOne(id: string): Promise<Event> {
    const event = await Events.findById(id).lean();
    if (!event) throw Error('DATA_NOT_FOUND');
    return event;
  }
  async deleteOne(id: string): Promise<string> {
    const ticketsGived = await TicketsFlow.find({ event: id, type: OperationTypes.GIVE })
      .populate({
        path: 'ticket',
      })
      .lean();
    const ticketsReceive = await TicketsFlow.find({
      event: id,
      type: OperationTypes.RECEIVE,
    })
      .populate({
        path: 'ticket',
      })
      .lean();
    /* Check if difference is not > to 0  */
    /*  Todo : Delete logic */
    return 'Event deleted succesfull';
  }
}
export default new EventsService();
