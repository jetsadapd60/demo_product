export interface LoginRespone {
  status: boolean;
  message: string;
  description: string;
  data: Data;
  transactionID: string;
  transactionDateTime: string;
}

interface Data {
  token: string;
  refreshToken: string;
  clientID: string;
  accID: string;
  otpActivated: boolean;
  email: string;
  phoneNumber: string;
}
