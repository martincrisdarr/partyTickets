import { Request, Response } from 'express';
import { errorHandler } from '../../utils/ErrorHandler';
import sellersService from '../../services/sellers.service';

class SellersController {
  create(req: Request, res: Response) {
    const { name } = req.body;
    sellersService
      .create(name)
      .then((message) => {
        return res.status(200).json({ code: 200, message });
      })
      .catch((e) => {
        errorHandler(res, e.message);
      });
  }
  getAllSellers(req: Request, res: Response) {
    sellersService
      .getAllSellers()
      .then((data) => {
        return res.status(200).json({ code: 200, data });
      })
      .catch((e) => {
        errorHandler(res, e.message);
      });
  }
  getOneSeller(req: Request, res: Response) {
    sellersService
      .getOneSeller(req.params.id)
      .then((data) => {
        return res.status(200).json({ code: 200, data });
      })
      .catch((e) => {
        errorHandler(res, e.message);
      });
  }
  giveSellerTickets(req: Request, res: Response) {
    const { idSeller, quantity, event } = req.body;
    if (!idSeller) throw Error('MISSING_ID');
    sellersService
      .giveSellerTickets(idSeller, quantity, event)
      .then((message) => {
        return res.status(200).json({ code: 200, message });
      })
      .catch((e) => {
        errorHandler(res, e.message);
      });
  }
  receiveSellerTickets(req: Request, res: Response) {
    const { idSeller, quantity, event } = req.body;
    if (!idSeller) throw Error('MISSING_ID');
    sellersService
      .receiveSellerTickets(idSeller, quantity, event)
      .then((message) => {
        return res.status(200).json({ code: 200, message });
      })
      .catch((e) => {
        errorHandler(res, e.message);
      });
  }
  deleteSeller(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) throw Error('MISSING_ID');
    sellersService
      .deleteSeller(id)
      .then((message) => {
        return res.status(200).json({ code: 200, message });
      })
      .catch((e) => {
        errorHandler(res, e.message);
      });
  }
}
export default new SellersController();
