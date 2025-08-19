import { IWalletService } from "../../services/interfaces/wallet.service.interfaces";
import { UpdateWalletDTO, WalletResponseDTO } from "../../dto/wallet/update-wallet.dto";
import { IWalletController } from "../interfaces/wallet.controller.interface";

export class WalletController implements IWalletController {
    constructor(
        private readonly _walletService: IWalletService
    ) { }

    async updateWallet(call: any, callback: any): Promise<void> {
        const dto: UpdateWalletDTO = {
            userId: call.request.userId,
            amount: call.request.amount,
            description: call.request.description,
            type: call.request.type,
        };

        const result: WalletResponseDTO = await this._walletService.updateWallet(dto);

        callback(null, {
            success: result.success,
            message: result.message,
            wallet: result.wallet ? {
                balance: result.wallet.balance,
                transactions: result.wallet.transactions.map(tx => ({
                    amount: tx.amount,
                    type: tx.type,
                    details: tx.description,
                    date: tx.createdAt,
                })),
            } : null,
        });
    }
}