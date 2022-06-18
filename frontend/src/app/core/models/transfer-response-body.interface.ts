export interface TransferResponseBody {
  from: {
    id: string;
    newBalance: number;
  };
  to: {
    id: string;
    newBalance: number;
  };
  transferId: string;
  message: string;
  performed: boolean;
}
