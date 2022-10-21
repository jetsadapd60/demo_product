import { Component, OnDestroy, OnInit } from "@angular/core";
import { TransmissionDataCorporateService } from "../transmission-data-corporate.service";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/shared/services/auth.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-create-account",
  templateUrl: "./create-account.component.html",
  styleUrls: ["./create-account.component.scss"],
})
export class CreateAccountComponent implements OnInit, OnDestroy {

  public isHidePass: boolean = false;
  public isHideConfirmPass: boolean = false;
  private subscription!: Subscription;
  public registorCorporate!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private corporateService: TransmissionDataCorporateService,
    private authService: AuthService,
    private router: Router
  ) {

    // ถ้าไม่มีข้อมูลให้กลับไปหน้า สร้างบัญชีนิติบุคคล
    if (!corporateService.loadContact) this.router.navigateByUrl('/auth/registor-corporate');

    // สร้างฟอร์ม
    this.buildForm();

    // กำหนดค่าเริ่มเบอร์โทร อีเมล์ ที่มาจากหน้า สร้างบัญชีนิติบุคคล
    this.setFormDefault();
  }

  ngOnInit(): void {}

  // สร้างบัญชี
  public onCreateAccount() {
    const dataCorporate = this.corporateService.loadaccountCorporate;
    const account = { ...dataCorporate, ...this.registorCorporate.value};
    console.log(account);
    let observ1 = this.authService.registor(account).subscribe(res => console.log('registor corperate >>>', res));
    this.subscription.add(observ1);
  }


  // Getter
  public get email() {
    return this.control('email');
  }

  public get password() {
    return this.control('password');
  }

  public get confirm() {
    return this.control("confirm");
  }

  public get phone() {
    return this.registorCorporate.get('phoneNumber') as FormGroup;
  }

  private buildForm() {
    this.registorCorporate = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("[A-Za-z0-9._]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")]],
      password: ['', [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,20}")]], //ความยาวอย่างน้อย 8 ตัวอักษร, ตัวพิมพ์เล็ก, ตัวพิมพ์ใหญ่, ตัวเลข, อักขระพิเ]ษ
      confirm: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
    },
    { 
      validator: ConfirmedValidator('password', 'confirm')
    });
  }

  private setFormDefault() {
    const data = this.corporateService.loadContact;
    
    if (data) {
      const { companyEmail: email, companyPhoneNumber: phoneNumber } = data;
      this.control('phoneNumber').setValue(phoneNumber);
      this.control('email').setValue(email);
    }
  }


  private control(controlName: string) {
    return this.registorCorporate.get(controlName) as AbstractControl;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}


function ConfirmedValidator(controlName: string, matchingControlName: string){
  return (formGroup: FormGroup) => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      // if (matchingControl?.errors) {
      //     return;
      // }
      if (control?.value !== matchingControl?.value) {
          matchingControl?.setErrors({ confirmedValidator: true });
      } else {
          matchingControl?.setErrors(null);
      }
  }
}