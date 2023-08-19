import logger from '../common/logger';
import Sellers from '../datamodels/Sellers';
import Tickets from '../datamodels/Tickets';
import TicketsFlow, { OperationTypes } from '../datamodels/TicketsFlow';

export class SellersService {
  async create(name: string): Promise<string> {
    const created = await Sellers.create({ name: name }).catch((err) => {
      logger.error(JSON.stringify(err));
    });
    if (!created) throw Error('CREATE_ERROR');
    return 'Seller created succesfull';
  }
  async getAllSellers() {
    const sellers = await Sellers.find()
      .lean()
      .catch((err) => {
        logger.error(JSON.stringify(err));
      });
    return sellers;
  }
  async getOneSeller(id: string) {
    const [seller, given, received] = await Promise.all([
      Sellers.findById(id).lean(),
      TicketsFlow.find({ seller: id, type: OperationTypes.GIVE }).lean(),
      TicketsFlow.find({ seller: id, type: OperationTypes.RECEIVE }).lean(),
    ]);
    if (!seller) throw Error('GET_ONE_SELLER');
    return { ...seller, given, received };
  }
  async giveSellerTickets(idSeller: string, quantity: number, event: string): Promise<string> {
    const ticket = await Tickets.findOne({ event }).lean();
    if (!ticket) throw Error('NO_TICKETS_REMAINING');

    const created = await TicketsFlow.create({
      seller: idSeller,
      quantity,
      type: 'GIVE',
      event,
      ticket: ticket._id,
    }).catch((err) => {
      logger.error(JSON.stringify(err));
    });
    if (!created) throw Error('CREATE_ERROR');
    return 'Tickets gived successful';
  }

  async receiveSellerTickets(idSeller: string, quantity: number, event: string): Promise<string> {
    const sellerTickets = await TicketsFlow.findOne({ event, seller: idSeller }).lean();
    if (!sellerTickets) throw Error('NOT_TICKETS_POSSESING');

    const created = await TicketsFlow.create({
      seller: idSeller,
      quantity,
      type: 'RECEIVE',
      event,
      ticket: sellerTickets.ticket,
    }).catch((err) => {
      logger.error(JSON.stringify(err));
    });
    if (!created) throw Error('CREATE_ERROR');
    return 'Tickets received successful';
  }
}
export default new SellersService();
