import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { EKycService } from "../../../../shared/services/index-service";

@Component({
  selector: "app-verify-detail",
  templateUrl: "e-kyc-page2.component.html",
  styleUrls: ["e-kyc-page2.component.scss"],
})
export class EKycPage2Component implements OnInit, OnDestroy {
  private subscription!: Subscription;
  constructor(private ekycService: EKycService, private router: Router) {}

  ngOnInit(): void {}

  onNextPage() {
    let observ1 = this.ekycService
      .eKycSave({ mobileKycActionPage: "KycPage3" })
      .subscribe((res) => {
        if (res.status) this.router.navigateByUrl("/e-kyc/KycPage3");
      });
      this.subscription?.add(observ1)
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
