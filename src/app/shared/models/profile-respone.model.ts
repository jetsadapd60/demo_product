export interface ProfileRespone {
  status: boolean;
  data: Data;
}

export interface Data {
  accId: string;
  profileImage: string;
  memberType: string;
  registerDate: string;
  registerSource: string;
  statusAccount: string;
  statusKYC: string;
  statusBankAccount: string;
  countryCode: string;
  otpStatus: boolean;
  mobileKycActionPage?: any;
  mobileBankAccActionPage?: any;
  member: Member;
}

export interface Member {
  cK_SyCo_PersonNationality?: any;
  personNationality?: any;
  firstName?: any;
  lastName?: any;
  idCard?: any;
  idCardImage?: any;
  birthDay?: any;
  email?: any;
  cK_SyCo_PersonMobile?: any;
  mobile?: any;
  houseRegisAddress: HouseRegisAddress;
  residentAddress: HouseRegisAddress;
  sendingDocAddress: HouseRegisAddress;
  cK_SyJPo?: any;
  jobPosition?: any;
  companyName?: any;
  cK_SyMIn_Month?: any;
  incomePerMonth?: any;
  cK_SyMIn_Year?: any;
  incomePerYear?: any;
  cK_SySFu?: any;
  sourceOfFund?: any;
  sourceOfFundOther?: any;
  accountNo?: any;
  fK_SyACTy?: any;
  accountType?: any;
  cK_SyBa?: any;
  bank?: any;
  bookBankImage?: any;
}

interface HouseRegisAddress {
  addressNo?: any;
  addressMoo?: any;
  addressBuilding?: any;
  addressFloor?: any;
  addressSoi?: any;
  addressStreet?: any;
  addressZipCode?: any;
  cK_SyPr?: any;
  provine?: any;
  cK_SyAm?: any;
  amphure?: any;
  cK_SyDi?: any;
  district?: any;
}