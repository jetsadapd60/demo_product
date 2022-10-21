import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ModifyAccountService } from "src/app/shared/services/modify-account.service";
import { EKycService, ProfileService } from "../../../../shared/services/index-service";

@Component({
  selector: "app-e-kyc-completed",
  templateUrl: "./e-kyc-completed.component.html",
  styleUrls: ["./e-kyc-completed.component.scss"],
})
export class EKycCompletedComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  constructor(
    private ekycService: EKycService,
    private router: Router,
    private modifyAccountService: ModifyAccountService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {}

  onNextPage() {
    let observ1 = this.ekycService.eKycSave().subscribe((res) => {

      if (res.status) {
        let observ2 = this.ekycService.kycEnd().subscribe();
        this.ekycService.loadEKycDataDefault(); 
        this.profileService.getProfile();
        this.router.navigateByUrl("/");
        this.subscription?.add(observ2);
      }
    });
    this.subscription?.add(observ1);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
