import { IWalletRepository } from '../../repositories/interfaces/wallet.repository.interfaces';
import { UpdateWalletDTO, WalletResponseDTO } from '../../dto/wallet/update-wallet.dto';
import { IWalletService } from '../interfaces/wallet.service.interfaces';

export class WalletService implements IWalletService {
    constructor(
        private readonly _walletRepository: IWalletRepository
    ) { }

    async updateWallet(dto: UpdateWalletDTO): Promise<WalletResponseDTO> {
        let wallet = await this._walletRepository.findWalletByUserId(dto.userId);

        if (!wallet) {
            wallet = await this._walletRepository.createWallet(dto.userId);
            if (!wallet) {
                return { success: false, message: 'Failed to create wallet' };
            }
        }

        const updatedWallet = await this._walletRepository.updateWallet(
            dto.userId,
            dto.amount,
            dto.type,
            dto.description
        );

        if (!updatedWallet) {
            return { success: false, message: 'Failed to update wallet' };
        }

        return {
            success: true,
            message: 'Wallet updated successfully',
            wallet: {
                balance: updatedWallet.balance,
                transactions: updatedWallet.transactions.map((tx: any) => ({
                    amount: tx.amount,
                    type: tx.type,
                    description: tx.description,
                    createdAt: tx.createdAt.toISOString(),
                })),
            },
        };
    }
}