import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/shared/services/auth.service";
import { CompanyTypeService } from "src/app/shared/services/company-type.service";
import { TransmissionDataCorporateService } from "./transmission-data-corporate.service";
import { setStoreage } from '../../../../utils/storage';
import { Router } from "@angular/router";
import { RegistorCorporateRequest } from "./registor-corporate.model";

@Component({
  selector: "app-registor-form-entity",
  templateUrl: "./registor-form-corporate.component.html",
  styleUrls: ["./registor-form-corporate.component.scss"],
})
export class RegistorFormCorporateComponent {
  public isHidePass: boolean = false;
  public isHideConfirmPass: boolean = false;

  public accountCorporateForm!: FormGroup;

  constructor(
    public conpanyTypes: CompanyTypeService,
    private fb: FormBuilder,
    private authService: AuthService,
    private corporateService: TransmissionDataCorporateService,
    private router: Router
  ) {
    this.buildForm();

    this.setFormDefault();
  }

  saveValue() {
    
    this.corporateService.setAccountCorporate = this.accountCorporateForm.value;
    this.router.navigateByUrl('/auth/create-account-corporate');
  }

  // Getter
  public get companyName() {
    return this.control('companyName') as AbstractControl;
  }

  public get companyType() {
    return this.control('cK_SyCPTy_Company') as AbstractControl;
  }

  public get contactName() {
    return this.control('companyContactName') as AbstractControl;
  }

  public get phoneNumber() {
    return this.control('companyPhoneNumber') as AbstractControl;
  }

  public get companyEmail() {
    return this.control('companyEmail') as AbstractControl;
  }

  private buildForm() {
    this.accountCorporateForm = this.fb.group({
      chkTermofService: [true],
      chkPolicy: [true],
      memberType: ["C"],
      registerSource: ["Web"],
      countryCode: ["TH"],
      // phoneNumber: [''],
      // email: [''],
      // password: [''],

      companyName: ['', [Validators.required]],
      cK_SyCPTy_Company: ['', [Validators.required]],
      companyContactName: ['', [Validators.required]],
      companyPhoneNumber: ['', [Validators.required, Validators.minLength(9)]],
      companyEmail: ['', [Validators.required, Validators.pattern("[A-Za-z0-9._]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")]],
    });
  }

  private setFormDefault() {
    const data: RegistorCorporateRequest | undefined = this.corporateService.loadaccountCorporate;
    if (!!data) this.accountCorporateForm.setValue(data);
    return undefined;
  }

  private control(controlName: string) {
    return this.accountCorporateForm.get(controlName) as AbstractControl;
  }
}
