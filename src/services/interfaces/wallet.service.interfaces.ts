
import { UpdateWalletDTO, WalletResponseDTO } from "../../dto/wallet/update-wallet.dto";

export interface IWalletService {
    updateWallet(walletUpdateRequest: UpdateWalletDTO): Promise<WalletResponseDTO>;
}