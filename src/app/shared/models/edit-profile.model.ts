import { HouseRegisAddress } from "src/app/shared/models/index-model";

export interface EditProfileModel {
  status: boolean;
  message: string;
  description: string;
  data: EditProfileData;
  transactionID: string;
  transactionDateTime: string;
}

export interface EditProfileData {
  profileImage: string;
  firstName: string;
  lastName: string;
  cK_SyBa: string;
  bankAccountNo: string;
  bookBankImage: string;
  cK_SyCo_PhoneNumber: string;
  phoneNumber: string;
  email: string;
  addressView: string;
  houseRegisAddress: HouseRegisAddress;
  state: boolean;
}