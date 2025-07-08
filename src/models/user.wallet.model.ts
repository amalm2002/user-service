import { model } from 'mongoose';
import WalletSchema from './schemas/user.wallet';
import { IWallet } from './interfaces/user.interface';


const walletModel = model<IWallet>('Wallet', WalletSchema);

export default walletModel 