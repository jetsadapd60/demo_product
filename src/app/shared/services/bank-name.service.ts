import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { BankNameDataModel, BankNameModel } from "../models/bank-name.model";

@Injectable({providedIn: "root"})
export class BankNameService {
  private readonly BASE_URL: string = environment.base_utl;

  private bankName = new Subject<BankNameDataModel[]>();

  constructor(private _http: HttpClient) {
    this.loadBankName().subscribe(res => this.bankName.next(res));
  }

  get bankName$(): Observable<BankNameDataModel[]> {
    return this.bankName.asObservable();
  }
  
  private loadBankName(): Observable<BankNameDataModel[]> {
    return this._http
      .get<BankNameModel>(`${this.BASE_URL}AusirisBackendApi/Master/Bank`)
      .pipe(map((bank) => {
        return bank.data.map(res => ({ ...res, picture: `http://203.150.199.17/AusirisBackendApi/${res.picture}`}));
      }));
  }
}
