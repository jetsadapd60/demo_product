import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { EKycService } from "../../../../shared/services/index-service";

@Component({
  selector: "app-personal-information",
  templateUrl: "e-kyc-page3.component.html",
  styleUrls: ["e-kyc-page3.component.scss"],
})
export class EKycPage3Component implements OnInit, AfterViewInit, OnDestroy {

  personalDetailForm!: FormGroup;
  isKycError!: boolean;
  private subscription!: Subscription;
  
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private ekycService: EKycService,
    private atr: ActivatedRoute
  ) {
    this.isKycError = (this.atr.snapshot.data as any).ekycError;
    this.loadKycData();
  }

  ngOnInit(): void {
    this.buildForm();
  }

  ngAfterViewInit(): void {
    this.loadKycData();
  }

  // ถ้ามาจากหน้าแสกนบัตรปปช.แล้ว error จะไปหน้าที่6 เพื่อถ่ายรูปบัตรปชช.อีกครั้ง
  // ถ้ามาจากหน้าที2 จะไปหน้าที่4
  onNextPage() {
    if (this.isKycError) {
      let observ1 = this.ekycService
      .eKycSave({...this.personalDetailForm.value, mobileKycActionPage: "KycPage6" })
      .subscribe((res) => {
        console.log(res)
        if (res.status) this.router.navigateByUrl("/e-kyc/KycPage6");
      });
      this.subscription?.add(observ1);
      return;
    }

    let observ2 = this.ekycService
      .eKycSave({...this.personalDetailForm.value, mobileKycActionPage: "KycPage4" })
      .subscribe(({ status }) => {
        if (status) this.router.navigateByUrl("/e-kyc/KycPage4")
      });
    this.subscription?.add(observ2);
  }

  private loadKycData() {
    let observ3 = this.ekycService.eKyc$.subscribe(res => {
      
      if (res && res.birthDay) {
        const { firstName, lastName, idCard, birthDay, mobile } = res;
        const data = {
          firstName, lastName, idCard, birthDay, mobile
        }
        
        this.personalDetailForm.setValue(data);
      }
    })
    this.subscription?.add(observ3);
  }

  get birthDay() {
    return this.personalDetailForm.get("birthDay") as AbstractControl;
  }

  get firstName() {
    return this.personalDetailForm.get("firstName") as AbstractControl;
  }

  get lastName() {
    return this.personalDetailForm.get("lastName") as AbstractControl;
  }

  get idCard() {
    return this.personalDetailForm.get("idCard") as AbstractControl;
  }

  get mobile() {
    return this.personalDetailForm.get("mobile") as AbstractControl;
  }

  onValidateOnlyNumber(e: any, controlName: string) {
    if ((e.keyCode === 8) || (e.keyCode >= 37 && e.keyCode <= 40)) return;
    if (e.keyCode < 48 || e.keyCode > 57) {
      this.personalDetailForm.get(controlName)?.reset();
    }
  }

  private buildForm() {
    this.personalDetailForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      idCard: ["", Validators.required],
      birthDay: ["", Validators.required],
      mobile: ["", [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
