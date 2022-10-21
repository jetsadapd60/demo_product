import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Respone } from "src/app/shared/models/respone.model";
import { environment } from "src/environments/environment";


@Injectable({providedIn: "root"})
export class BankAccountService {
  
  private readonly BASE_URL: string = environment.base_utl;
  private defaultBankAccountData = {
    mobileBankAccActionPage: "",
    fK_SyACTy: "",
    cK_SyBa: "",
    bankAccountNo: "",
    bookBankImage: "",
  };

  constructor(private _http: HttpClient) {}

  saveBankAccount(body: any): Observable<Respone> {

    return this._http.post<Respone>(
      `${this.BASE_URL}AusirisBackendApi/FrontendMember/BankAccountSave`,
      body
    );
  }
}
