
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { NationalityModel } from "../../../../shared/models/index-model";
import { LoadDataKycApiService, EKycService } from "../../../../shared/services/index-service";

@Component({
  selector: "app-selected-nationality",
  templateUrl: "e-kyc-page1.component.html",
  styleUrls: ["e-kyc-page1.component.scss"],
})
export class EKycPage1Component implements OnInit, OnDestroy {

  public nationalityForm!: FormGroup;
  nationalitys: NationalityModel[] = [];
  private subscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    public loadDataKycService: LoadDataKycApiService,
    private router: Router,
    private eKycService: EKycService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.loadNationality();
  }

  public onSaveNationalit() {
    console.log(localStorage.getItem('email'))
    let { cK_SyCo_PersonNationality } = this.nationalityForm.value;
    let observ1 = this.eKycService.eKycSave({ cK_SyCo_PersonNationality, mobileKycActionPage: "KycPage2", email: localStorage.getItem('email') })
    .subscribe(res => {
      if (res.status) {
        this.router.navigateByUrl("/e-kyc/KycPage2");
      }
    });

    this.subscription?.add(observ1);
  }

  get nationality() {
    return this.nationalityForm.get("cK_SyCo_PersonNationality") as FormGroup;
  }

  private loadNationality() {
    let observ2 = this.loadDataKycService.nationality.subscribe((nationality) => {
      this.nationalitys = nationality;
    });
    this.subscription?.add(observ2);
  }

  private buildForm() {
    this.nationalityForm = this.fb.group({
      cK_SyCo_PersonNationality: ["", Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
