import { UpdateWalletDTO,WalletResponseDTO } from "../../dto/wallet/update-wallet.dto";

export interface IWalletController {
  updateWallet(call: any, callback: any): void;
}