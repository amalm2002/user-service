import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'
import { ObjectId } from "mongoose";
import 'dotenv/config'
import dotenv from 'dotenv'
dotenv.config()

export class AuthService {
    private readonly jwtSecretKey: string

    constructor() {
        this.jwtSecretKey = process.env.USER_SECRET_KEY || 'Amal'
        if (!process.env.USER_SECRET_KEY) {
            throw new Error('USER_SECRET_KEY  is not defied in the ENV file')
        }
    }

    createToken = async (clientId: ObjectId | string, expire: string): Promise<string> => {
        return jwt.sign({ clientId }, this.jwtSecretKey, { expiresIn: expire as SignOptions['expiresIn'], })
    }

    verifyOption = (token: string): JwtPayload | { message: string } => {
        try {
            return jwt.verify(token, this.jwtSecretKey) as JwtPayload
        } catch (error: any) {
            console.error("Token verification failed:", error.message);
            return { message: "Invalid OTP" };
        }
    }
}