export interface BankNameModel {
  status: boolean;
  message: string;
  description: string;
  data: BankNameDataModel[];
  transactionID: string;
  transactionDateTime: string;
}

export interface BankNameDataModel {
  pK_SyBa: string;
  picture: string;
  code: string;
  name: string;
  sort: number;
}