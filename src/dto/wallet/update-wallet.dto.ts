export interface UpdateWalletDTO {
  userId: string;
  amount: number;
  description: string;
  type: 'credit' | 'debit';
}

export interface WalletResponseDTO {
  success: boolean;
  message: string;
  wallet?: {
    balance: number;
    transactions: {
      amount: number;
      type: 'credit' | 'debit';
      description: string;
      createdAt: string;
    }[];
  };
}