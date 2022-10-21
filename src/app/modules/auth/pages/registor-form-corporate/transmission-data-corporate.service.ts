import { Injectable } from "@angular/core";
import { RegistorCorporateRequest } from "./registor-corporate.model";

@Injectable()
export class TransmissionDataCorporateService {

    private accountCorporate!: RegistorCorporateRequest;

    get loadaccountCorporate() {
        return this.accountCorporate;
    }

    get loadContact(): { companyEmail: string, companyPhoneNumber: string } | undefined  {
        
        if (this.accountCorporate) {
            const { companyEmail, companyPhoneNumber } = this.accountCorporate;
            return { companyEmail, companyPhoneNumber }
        }

        return undefined;
    }

    set setAccountCorporate(accountCorporate: RegistorCorporateRequest) {
        this.accountCorporate = accountCorporate;
    }

}