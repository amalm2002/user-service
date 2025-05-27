
import bcrypt from 'bcryptjs';
import { IBcryptService } from '../interfaces/bcrypt.service.interface';

export class BcryptService implements IBcryptService {
  async securePassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async matchPassword(passwordOne: string, passwordTwo: string): Promise<boolean> {
    return await bcrypt.compare(passwordOne, passwordTwo);
  }
}