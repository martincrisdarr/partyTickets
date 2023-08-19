import { Request, Response } from 'express';
import authService from '../../services/auth.service';
import { errorHandler } from '../../utils/ErrorHandler';
class AuthController {
  login(req: Request, res: Response): void {
    const { name, password } = req.body;
    authService
      .login(name, password)
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((e) => {
        errorHandler(res, e.message);
      });
  }
  register(req: Request, res: Response): void {
    const { name, password } = req.body;
    authService
      .register(name, password)
      .then((message) => {
        return res.status(200).json({ code: 200, message });
      })
      .catch((e) => {
        errorHandler(res, e.message);
      });
  }
}
export default new AuthController();
