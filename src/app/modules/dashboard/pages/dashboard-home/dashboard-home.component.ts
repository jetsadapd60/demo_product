import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MobileKycActionPage } from "../../../../shared/models/index-model";
import { EKycService } from "../../../../shared/services/index-service";
import { ProfileService } from "src/app/shared/services/profile.service";

import { Member } from "../../../../shared/models/index-model";
import { Subscription } from "rxjs";
type statusType = "N" | "W";
type statusAccount = "N" | "Y";
@Component({
  selector: "app-dashboard-home",
  templateUrl: "./dashboard-home.component.html",
  styleUrls: ["./dashboard-home.component.scss"],
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
  public memberTypePersonal!: Member;
  public memberTypeCorperrate!: Member;
  public memberType: "C" | "P" = "P";
  public mobileKycActionPage!: MobileKycActionPage;
  public email!: string;
  private subscription: Subscription[] = [];
  public statusAccount: statusAccount = "N";
  public statusKYC: statusType = "N";
  public statusBankAccount: statusType = "N";

  constructor(
    private router: Router,
    private ekycService: EKycService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.setupEmail();

    this.profileService.getProfile();

    this.subscription.push(
      this.ekycService.eKyc$.subscribe(({ mobileKycActionPage }) => {
        console.log(mobileKycActionPage);
        if (mobileKycActionPage) {
          this.mobileKycActionPage = mobileKycActionPage;
        } else {
          this.mobileKycActionPage = "KycPage1";
        }
      })
    );

    this.subscription.push(
      this.profileService.profile$.subscribe(
        ({ statusAccount, statusKYC, statusBankAccount }) => {
          this.statusAccount = statusAccount as statusAccount;
          this.statusKYC = statusKYC as statusType;
          this.statusBankAccount = statusBankAccount as statusType;
          console.log("statusAccount >>>", statusAccount);
        }
      )
    );

    // this.subscription?.add(observ1);
    // this.subscription?.add(observ2);
  }

  private setupEmail(): void {
    const email = localStorage.getItem("email");
    email ? (this.email = email) : (this.email = "elegance@mail.com");
  }

  public eKycVerify() {
    this.router.navigateByUrl(`/e-kyc/${this.mobileKycActionPage}`);
  }

  public bankAccountVerify() {
    this.router.navigateByUrl(`/bank-account/KycPage11`);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((item) => item.unsubscribe());
  }
}
