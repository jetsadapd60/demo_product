import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, share, Subscription, tap } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class CompanyTypeService implements OnDestroy {
  private companyType = new BehaviorSubject<any>(null);
  subscription!: Subscription;
  private readonly BASE_URL: string = environment.base_utl;

  constructor(private _http: HttpClient) {
    let observ1 = this.loadCompanyType().subscribe();
    this.subscription.add(observ1);
  }

  get companyTypes$(): Observable<any> {
    return this.companyType.asObservable();
  }

  private loadCompanyType() {
    return this._http
      .get(`${this.BASE_URL}AusirisBackendApi/Master/CompanyType/M`)
      .pipe(tap((res) => this.companyType.next(res)));
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
