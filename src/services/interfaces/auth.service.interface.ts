
import { JwtPayload } from 'jsonwebtoken';
import { ObjectId } from 'mongoose';

export interface IAuthService {
  createToken(clientId: ObjectId | string, expire: string, role: string): Promise<string>;
  verifyOption(token: string): JwtPayload | { message: string };
}