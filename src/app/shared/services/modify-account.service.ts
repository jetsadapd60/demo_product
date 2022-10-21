import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, map, Observable, Subscription, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { BankNameDataModel } from "../models/bank-name.model";
import { BankNameService } from "./bank-name.service";
import {
  EditProfileData,
  EditProfileModel,
} from "../../shared/models/edit-profile.model";

@Injectable({providedIn: "root"})
export class ModifyAccountService implements OnDestroy {
  private readonly BASE_URL: string = environment.base_utl;
  private account = new BehaviorSubject<Partial<EditProfileData>>({});
  private subscription!: Subscription;
  private bankName: BankNameDataModel[] = [];

  get loadAccount$(): Observable<Partial<EditProfileData>> {
    return this.account.asObservable();
  }

  constructor(
    private _http: HttpClient,
    private bankNameService: BankNameService
  ) {
    this.load();
    let observ1 = this.bankNameService.bankName$?.subscribe((res) => (this.bankName = res));
    this.subscription?.add(observ1);
  }

  load() {
    // let observ2 = this.editProfile()?.subscribe((res) => this.account.next(res));
    // this.subscription?.add(observ2);
  }

  editProfile(): Observable<Partial<any>> {
    return this._http
      .get<EditProfileModel>(
        `${this.BASE_URL}AusirisBackendApi/FrontendMember/EditProfile`
      )
      .pipe(
        map((res) => {
          console.log("bank name >>>", this.bankName);
          console.log("load edit profile >>>", res);
          // const {
          //   profileImage, firstName, lastName, cK_SyBa, bankAccountNo,
          //   bookBankImage, cK_SyCo_PhoneNumber, phoneNumber, email, houseRegisAddress,
          // } = res.data;

          // const {
          //   addressNo, addressMoo, addressBuilding, addressFloor, addressSoi,
          //   addressStreet, addressZipCode, cK_SyPr, cK_SyAm, cK_SyDi
          // } = houseRegisAddress;
          return res;
          // return {
          //   profileImage,
          //   firstName,
          //   lastName,
          //   cK_SyBa,
          //   bankAccountNo,
          //   bookBankImage,
          //   cK_SyCo_PhoneNumber,
          //   phoneNumber,
          //   email,
          //   houseRegisAddress: {
          //     addressNo,
          //     addressMoo,
          //     addressBuilding,
          //     addressFloor,
          //     addressSoi,
          //     addressStreet,
          //     addressZipCode,
          //     cK_SyPr,
          //     cK_SyAm,
          //     cK_SyDi,
          //   },
          //   state: res.status,
          // } as Partial<EditProfileData>;
        })
      );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
