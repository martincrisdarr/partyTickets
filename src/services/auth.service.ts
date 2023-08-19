import Users, { User, UserTypes } from '../datamodels/Users';
import bcrypt from 'bcrypt';
import { AuthSigner } from '../common/authSigner';
import { PartialBy } from '../types/declarations';

export class AuthService {
  async login(name: string, password: string) {
    if (!name || !password) throw Error(`MISSING_DATA`);
    const user = await Users.findOne({ name }).select('+password').lean();
    if (!user) throw Error(`INVALID_USER`);
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) throw Error(`INVALID_CREDENTIAL`);

    const userModel = {
      token: AuthSigner(user),
      user: { ...(user as PartialBy<User, 'password'>) },
    };
    delete userModel.user.password;
    return userModel;
  }
  async register(name: string, password: string): Promise<string> {
    if (!name || !password) throw Error(`MISSING_DATA`);
    const created = await Users.create({
      name,
      password,
      type: UserTypes.ADMIN,
    });
    if (!created) throw Error('CREATE_ERROR');
    return 'User created succesful';
  }
}
export default new AuthService();
