
export interface IWalletRepository {
  findWalletByUserId(userId: string): Promise<any>;
  createWallet(userId: string): Promise<any>;
  updateWallet(userId: string, amount: number, type: 'credit' | 'debit', description: string): Promise<any>;
}