import { HouseRegisAddress } from "src/app/shared/models/index-model";

export type MobileKycActionPage = "KycPage1" | "KycPage2"| "KycPage3"| "KycPage4"| "KycPage5"| "KycPage6"| "KycPage7"| "KycPage8";

export interface EKycModel {
  mobileKycActionPage: MobileKycActionPage;
  cK_SyCo_PersonNationality: string;
  firstName: string;
  lastName: string;
  idCard: string;
  idCardImage: string;
  birthDay: string;
  email: string;
  cK_SyCo_PersonMobile: string;
  mobile: string;
  cK_SyJPo: string;
  companyName: string;
  cK_SyMIn_Month: string;
  cK_SyMIn_Year: string;
  cK_SySFu: string;
  sourceFundOther: string;
  houseRegisAddress: HouseRegisAddress;
  residentAddress: HouseRegisAddress;
  sendingDocAddress: HouseRegisAddress;
}


export interface EKycRespone {
  status: boolean;
  message: string;
  description: string;
  data: string;
  transactionID: string;
  transactionDateTime: string;
}