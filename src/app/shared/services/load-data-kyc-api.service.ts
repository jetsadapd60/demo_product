import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, map, Observable, shareReplay, Subscription, tap } from "rxjs";
import { Respone } from "../../shared/models/index-model";
import { environment } from "src/environments/environment";
import { NationalityModel, JobPositionModel } from "../../shared/models/index-model";
import {
  AmphureModel,
  DistrictModel,
  IncomePerMonthModel,
  ProvinceModel,
  SourceFundModel,
} from "../../shared/models/index-model";

interface KycData {
  nationality: NationalityModel[];
  jobPosition: JobPositionModel[];
  province: ProvinceModel[];
  sourceFundModel: SourceFundModel[];
  incomePerMonth: IncomePerMonthModel[];
  incomePerYear: IncomePerMonthModel[];
}

@Injectable()
export class LoadDataKycApiService implements OnDestroy {

  private BASE_URL: string = environment.base_utl + "AusirisBackendApi/Master/";
  private subscription!: Subscription;
  private kycData: KycData = {
    nationality: [],
    jobPosition: [],
    province: [],
    sourceFundModel: [],
    incomePerMonth: [],
    incomePerYear: []
  };

  private stream$ = new BehaviorSubject<KycData>(this.kycData);

  public jobPosition = this.stream$.pipe(map((res) => res.jobPosition));
  public nationality = this.stream$.pipe(map((res) => res.nationality));
  public provinces = this.stream$.pipe(map((res) => res.province));
  public incomePerMonth = this.stream$.pipe(map((res) => res.incomePerMonth), shareReplay());
  public incomePerYear = this.stream$.pipe(map((res) => res.incomePerYear), shareReplay());

  constructor(private _http: HttpClient) {
    //
    let observ1 = this.loadJobPosition().subscribe((res) => {
      if (res.status) {
        this.kycData.jobPosition = res.data;
        this.emitKycData();
      }
    });

    //
    let observ2 = this.getNationality().subscribe((res: NationalityModel[]) => {
      if (res.length > 0) {
        this.kycData.nationality = res;
        this.emitKycData();
      } else {
        console.log("ไม่สามารถโหลดข้อมูล ประเทศ ได้");
      }
    });

    // 
    let observ3 = this.loadProvince().subscribe((res) => {
      if (res.length > 0) {
        this.kycData.province = res;
        this.emitKycData();
      } else {
        console.log("ไม่สามารถโหลดข้อมูล จังหวัด ได้");
      }
    });

    //
    let observ4 = this.loadSourceFund().subscribe((res) => {
      if (res.length > 0) {
        this.kycData.sourceFundModel = res;
      } else {
        console.log("ไม่สามารถโหลดข้อมูล แหล่งที่มาเงินทุน ได้");
      }
    });

    //
    let observ5 = this.loadIncomePerMonth().subscribe((res) => {
      if (res) this.kycData.incomePerMonth = res
    });

          //
    let observ6 = this.loadIncomePerYear().subscribe((res) => {
      if (res) this.kycData.incomePerYear = res;
    });

    this.subscription?.add(observ1);
    this.subscription?.add(observ2);
    this.subscription?.add(observ3);
    this.subscription?.add(observ4);
    this.subscription?.add(observ5);
    this.subscription?.add(observ6);
  }

  get KycDataApi() {
    return this.stream$.asObservable()!;
  }

  private emitKycData() {
    this.stream$.next(this.kycData);
  }

  // โหลด ประเทศ
  private getNationality(): Observable<NationalityModel[]> {
    return this._http.get<NationalityModel[]>(`${this.BASE_URL}Country/M`);
  }

  // โหลด ตำ่แหน่งงาน
  private loadJobPosition() {
    return this._http.get<Respone>(`${this.BASE_URL}JobPosition`);
  }

  //   โหลด ข้อมูลจังหวัด
  public loadProvince(): Observable<ProvinceModel[]> {
    return this._http.get<ProvinceModel[]>(`${this.BASE_URL}Province/M`);
  }
  
  //   โหลด ข้อมูลอำเภอ
  public loadAmphure(province: string): Observable<AmphureModel[]> {
    // console.log('province >> ', province)
    return this._http.get<AmphureModel[]>(
      `${this.BASE_URL}Amphure/ByProvince/M/${province}`
    );
  }

  // โหลด ข้อมูลตำบล
  public loadDistrict(amphure: string): Observable<DistrictModel[]> {
    // console.log(amphure);
    return this._http.get<DistrictModel[]>(
      `${this.BASE_URL}District/ByAmphure/M/${amphure}`
    );
  }

  // โหลด แหล่งที่มาเงินลงทุน
  public loadSourceFund(): Observable<SourceFundModel[]> {
    return this._http.get<SourceFundModel[]>(`${this.BASE_URL}SourceFund/M`);
  }

  // โหลด รายได้ต่อเดือน
  public loadIncomePerMonth(): Observable<IncomePerMonthModel[]> {
    return this._http.get<any>(
      `${this.BASE_URL}MoneyIncome/GetMonthly`
    ).pipe(map(res=>res.data as IncomePerMonthModel[]));
  }

    // โหลด รายได้ต่อปี
    public loadIncomePerYear(): Observable<IncomePerMonthModel[]> {
      return this._http.get<any>(
        `${this.BASE_URL}MoneyIncome/GetYearly`
      ).pipe(map(res=>res.data as IncomePerMonthModel[]));
    }

    ngOnDestroy(): void {
      this.subscription?.unsubscribe();
    }
}