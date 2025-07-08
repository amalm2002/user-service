
import { UpdateWalletDTO, WalletResponseDTO } from "../../dto/wallet/update-wallet.dto";

export interface IWalletService {
    updateWallet(dto: UpdateWalletDTO): Promise<WalletResponseDTO>;
}