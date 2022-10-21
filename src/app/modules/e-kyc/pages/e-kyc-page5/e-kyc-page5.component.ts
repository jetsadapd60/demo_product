import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import {
  JobPositionModel,
  IncomePerMonthModel,
  SourceFundModel,
} from "../../../../shared/models/index-model";
import { EKycService, LoadDataKycApiService } from "../../../../shared/services/index-service";

@Component({
  selector: "app-personal-source",
  templateUrl: "e-kyc-page5.component.html",
  styleUrls: ["e-kyc-page5.component.scss"],
})
export class EKycPage5Component implements OnInit, OnDestroy {
  public sourceFunds: SourceFundModel[] = [];
  public jobPositions: JobPositionModel[] = [];
  public incomePerMonth: IncomePerMonthModel[] = [];
  public incomePerYear: IncomePerMonthModel[] = [];
  private subscription!: Subscription;
  public sourceFundFrom!: FormGroup;
  public isSelectOther = false;
  public disableSourceFund = true;

  constructor(
    private fb: FormBuilder,
    private loadDataKycService: LoadDataKycApiService,
    private ekycService: EKycService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.loadData();

    let observ1 = this.sourceFundFrom.get("sourceFund")?.valueChanges.subscribe((res) => {
      if (res === "5424ddc6-beca-4b52-b3b2-2bb05a0e8716") {
        this.isSelectOther = true;
      } else {
        this.isSelectOther = false;
      }
    });

    this.subscription?.add(observ1);
  }

  onSubmitSourceFund() {
    const {
      pK_SyJPo,
      companyName,
      incomePerMonth,
      incomePerYear,
      sourceFund,
      sourceFundOther,
    } = this.sourceFundFrom.value;

    console.log(this.sourceFundFrom.value);

    let observ2 = this.ekycService
      .eKycSave({
        cK_SyJPo: pK_SyJPo,
        companyName,
        cK_SyMIn_Month: incomePerMonth,
        cK_SyMIn_Year: incomePerYear,
        cK_SySFu: sourceFund,
        sourceFundOther,
        mobileKycActionPage: "KycPage6",
      })
      .subscribe((res) => {
        if (res.status) this.router.navigateByUrl("/e-kyc/KycPage6");
      });
    this.subscription?.add(observ2);
  }

  private buildForm() {
    this.sourceFundFrom = this.fb.group({
      pK_SyJPo: ["", Validators.required], // อาชีพ
      companyName: [null, Validators.required], // ชื่อบริษัท
      incomePerMonth: ["", Validators.required], // รายได้ต่อเดือน
      incomePerYear: ["", Validators.required], // รายได้ต่อปี
      sourceFund: ["", Validators.required], // แหล่งที่มาเงินทุน
      sourceFundOther: [null, Validators.required], // // แหล่งที่มาเงินทุนอื่น
    });
  }

  private loadData() {
    let observ3 = this.loadDataKycService
      .loadSourceFund()
      .subscribe((sourceFunds) => (this.sourceFunds = sourceFunds));

    let observ4 = this.loadDataKycService.jobPosition.subscribe(
      (res) => (this.jobPositions = res)
    );

    let observ5 = this.loadDataKycService.incomePerMonth.subscribe(
      (res) => (this.incomePerMonth = res)
    );

    let observ6 = this.loadDataKycService.incomePerYear.subscribe(
      (res) => (this.incomePerYear = res)
    );

    this.subscription?.add(observ3);
    this.subscription?.add(observ4);
    this.subscription?.add(observ5);
    this.subscription?.add(observ6);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
