import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import {
  BehaviorSubject,
  map,
  Observable,
  shareReplay,
  Subject,
  Subscription,
  tap,
} from "rxjs";
import { ProfileRespone } from "src/app/shared/models/profile-respone.model";
import { environment } from "src/environments/environment";
import { EKycModel, EKycRespone } from "../models/kyc.model";

@Injectable()
export class EKycService implements OnDestroy {
  private eKycDataDefault: any = {
    mobileKycActionPage: null,
    cK_SyCo_PersonNationality: null,
    firstName: null,
    lastName: null,
    idCard: null,
    idCardImage: null,
    birthDay: null,
    email: localStorage.getItem('email')? localStorage.getItem('email'):null,
    cK_SyCo_PersonMobile: null,
    mobile: null,
    cK_SyJPo: null,
    companyName: null,
    cK_SyMIn: null,
    incomePerYear: null,
    cK_SySFu: null,
    sourceFundOther: null,
    houseRegisAddress: {
      addressNo: null,
      addressMoo: null,
      addressBuilding: null,
      addressFloor: null,
      addressSoi: null,
      addressStreet: null,
      addressZipCode: null,
      cK_SyPr: null,
      cK_SyAm: null,
      cK_SyDi: null,
    },
    residentAddress: {
      addressNo: null,
      addressMoo: null,
      addressBuilding: null,
      addressFloor: null,
      addressSoi: null,
      addressStreet: null,
      addressZipCode: null,
      cK_SyPr: null,
      cK_SyAm: null,
      cK_SyDi: null,
    },
    sendingDocAddress: {
      addressNo: null,
      addressMoo: null,
      addressBuilding: null,
      addressFloor: null,
      addressSoi: null,
      addressStreet: null,
      addressZipCode: null,
      cK_SyPr: null,
      cK_SyAm: null,
      cK_SyDi: null,
    },
  };
  private BASE_URL: string = environment.base_utl;
  private stream = new BehaviorSubject<EKycModel>(this.eKycDataDefault);
  private subscription!: Subscription;

  public get eKyc$() {
    return this.stream.asObservable();
  }

  constructor(private _http: HttpClient) {
    // let observ1 = this.loadEKycDataDefault().subscribe((res) => {
    //   this.eKycDataDefault = res;
    //   this.stream.next(res);
    // });

    // this.subscription?.add(observ1);
    this.loadEKycDataDefault();
  }

  kycEnd() {
    return this._http.get(
      "http://203.150.199.17/AusirisBackendApi/FrontendMember/KycEnd"
    );
  }

  // กำหนดค่าเริ่มต้น
  public loadEKycDataDefault(): void {
    let observ1 = this._http
      .get<ProfileRespone>(
        `${this.BASE_URL}AusirisBackendApi/FrontendMember/GetProfile`
      )
      .pipe(
        map((res) => {
          const {
            mobileKycActionPage,
            member: {
              cK_SyCo_PersonNationality,
              firstName,
              lastName,
              idCard,
              idCardImage,
              birthDay,
              email,
              cK_SyCo_PersonMobile,
              mobile,
              cK_SyJPo,
              companyName,
              cK_SySFu,
              cK_SyMIn_Month,
              cK_SyMIn_Year,
              sourceOfFundOther: sourceFundOther,
              houseRegisAddress,
              residentAddress,
              sendingDocAddress,
            },
          } = res.data;

          return {
            mobileKycActionPage,
            cK_SyCo_PersonNationality,
            firstName,
            lastName,
            idCard,
            idCardImage,
            birthDay,
            email,
            cK_SyCo_PersonMobile,
            mobile,
            cK_SyJPo,
            companyName,
            cK_SyMIn_Month,
            cK_SyMIn_Year,
            cK_SySFu,
            sourceFundOther,
            houseRegisAddress: houseRegisAddress,
            residentAddress: residentAddress,
            sendingDocAddress: sendingDocAddress,
          } as EKycModel;
        })
      ).subscribe(res => {
        this.eKycDataDefault = res;
        this.stream.next(res);
        console.log(res)
      });
      this.subscription?.add(observ1);
  }

  public eKycSave(kycData?: any): Observable<EKycRespone> {
    // กำหนดค่าให้กับ prepery eKycDataDefault หลังจากกรอกข้อมูลแล้ว
    for (let key in kycData) {
      this.eKycDataDefault[key] = kycData[key];
    }

    return this._http
      .post<EKycRespone>(
        `${this.BASE_URL}AusirisBackendApi/FrontendMember/KycSave`,
        this.eKycDataDefault
      ).pipe(tap(res => {
        this.loadEKycDataDefault();
      }))
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
