export interface RegistorCorporateRequest {
  chkTermofService: boolean;
  chkPolicy: boolean;
  memberType: string;
  registerSource: string;
  countryCode: string;
  phoneNumber?: string;
  email?: string;
  password?: string;
  companyName: string;
  cK_SyCPTy_Company: string;
  companyContactName: string;
  companyPhoneNumber: string;
  companyEmail: string;
}