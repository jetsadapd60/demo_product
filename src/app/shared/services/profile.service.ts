import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, map, Observable, Subject, Subscription } from "rxjs";
import { environment } from "src/environments/environment";
import { ProfileRespone } from "../models/index-model";

@Injectable()
export class ProfileService implements OnDestroy {
  // MAIN URL
  private readonly BASE_URL: string = environment.base_utl;
  private subscription: Subscription[] = [];
  
  // Store
  private stream = new BehaviorSubject<{
    fullName: string;
    accId: string;
    profileImage: string;
    email: string;
    statusAccount: string;
    statusKYC: string;
    statusBankAccount: string;
  }>({
    fullName: "",
    accId: "",
    profileImage: "",
    email: "",
    statusAccount: "",
    statusKYC: "",
    statusBankAccount: "",
  });

  // Selector
  public profile$ = this.stream.asObservable();

  constructor(private _http: HttpClient) {
    this.getProfile();
  }

  // Ex
  public getProfile(): void {
    console.log('okkkkkkkkkkkk')
    this.subscription.push( this._http
      .get<ProfileRespone>(
        `${this.BASE_URL}AusirisBackendApi/FrontendMember/GetProfile`
      )
      .pipe(
        map((res) => {
          const {
            data: {
              member: { firstName, lastName, email },
              accId,
              profileImage,
              statusAccount,
              statusKYC,
              statusBankAccount,
            },
          } = res;
          return {
            fullName: `${firstName} ${lastName}`,
            email,
            accId,
            profileImage,
            statusAccount,
            statusKYC,
            statusBankAccount,
          };
        })
      ).subscribe((res) => this.stream.next(res)))
  }

  ngOnDestroy(): void {
    this.subscription.forEach(res => res.unsubscribe());
  }
}
