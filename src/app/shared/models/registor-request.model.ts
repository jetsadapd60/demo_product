export interface ResponePResponeData {
  status: boolean;
  message: string;
  description: string;
  data: DataPResponeData;
  transactionID: string;
  transactionDateTime: string;
}

export interface DataPResponeData {
  accID: string;
  memberType: string;
  registerDate: string;
  email: string;
  phoneNumber: string;
  otpStatus: boolean;
}