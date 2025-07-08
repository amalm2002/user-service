
// import mongoose from 'mongoose';
// import WalletModel from '../../models/user.wallet.model';
// import { IWalletRepository } from '../interfaces/wallet.repository.interfaces';



// export class WalletRepository implements IWalletRepository {
//     async findWalletByUserId(userId: string): Promise<any> {
//         return await WalletModel.findOne({ userId }).lean();
//     }

//     async createWallet(userId: string): Promise<any> {
//         return await WalletModel.create({ userId, balance: 0, transactions: [] });
//     }

//     async updateWallet(userId: string, amount: number, type: 'credit' | 'debit', description: string): Promise<any> {
//         const update = type === 'credit'
//             ? { $inc: { balance: amount }, $push: { transactions: { amount, type, description, createdAt: new Date() } } }
//             : { $inc: { balance: -amount }, $push: { transactions: { amount, type, description, createdAt: new Date() } } };

//         return await WalletModel.findOneAndUpdate(
//             { userId },
//             update,
//             { new: true }
//         ).lean();
//     }
// }


import mongoose from 'mongoose';
import WalletModel from '../../models/user.wallet.model';
import { IWalletRepository } from '../interfaces/wallet.repository.interfaces';
import { BaseRepository } from './base.repository';

export class WalletRepository extends BaseRepository<any> implements IWalletRepository {
    constructor() {
        super(WalletModel);
    }

    async findWalletByUserId(userId: string): Promise<any> {
        return await WalletModel.findOne({ userId }).lean();
    }

    async createWallet(userId: string): Promise<any> {
        return await WalletModel.create({ userId, balance: 0, transactions: [] });
    }

    async updateWallet(userId: string, amount: number, type: 'credit' | 'debit', description: string): Promise<any> {
        const update = type === 'credit'
            ? { $inc: { balance: amount }, $push: { transactions: { amount, type, description, createdAt: new Date() } } }
            : { $inc: { balance: -amount }, $push: { transactions: { amount, type, description, createdAt: new Date() } } };

        return await WalletModel.findOneAndUpdate(
            { userId },
            update,
            { new: true }
        ).lean();
    }
}