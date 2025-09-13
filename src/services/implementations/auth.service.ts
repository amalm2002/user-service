
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { ObjectId } from 'mongoose';
import 'dotenv/config';
import { IAuthService } from '../interfaces/auth.service.interface';

export class AuthService implements IAuthService {
  private readonly _jwtSecretKey: string;

  constructor() {
    this._jwtSecretKey = process.env.USER_SECRET_KEY || 'Amal@1';
    if (!process.env.USER_SECRET_KEY) {
      throw new Error('USER_SECRET_KEY is not defined in the ENV file');
    }
  }

  async createToken(clientId: string | ObjectId, expire: string, role: string): Promise<string> {
    return jwt.sign({ clientId, role }, this._jwtSecretKey, { expiresIn: expire as SignOptions['expiresIn'] });
  }

  verifyOption(token: string): JwtPayload | { message: string } {
    try {
      return jwt.verify(token, this._jwtSecretKey) as JwtPayload;
    } catch (error: any) {
      console.error("Token verification failed:", error.message);
      return { message: "Invalid OTP" };
    }
  }
}