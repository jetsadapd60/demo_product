import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import {
  AmphureModel,
  DistrictModel,
  ProvinceModel,
} from "../../../../shared/models/index-model";
import { EKycService, LoadDataKycApiService } from "../../../../shared/services/index-service";

@Component({
  selector: "app-personal-residence",
  templateUrl: "e-kyc-page4.component.html",
  styleUrls: ["e-kyc-page4.component.scss"],
})
export class EKycPage4Component implements OnInit, OnDestroy {
  
  public residenceForm!: FormGroup;
  public otherResidenceForm!: FormGroup;
  public isSameAddress = false;
  private subscription!: Subscription;

  public provinces: ProvinceModel[] = [];
  public amphures: AmphureModel[] = [];
  public districts: DistrictModel[] = [];
  public zipCode = '';

  public provincesOther: ProvinceModel[] = [];
  public amphureOther: AmphureModel[] = [];
  public districtsOther: DistrictModel[] = [];
  public zipCodeOther = '';


  constructor(
    private fb: FormBuilder,
    public loadDataKycService: LoadDataKycApiService,
    private router: Router,
    private ekycService: EKycService
  ) { }

  ngOnInit(): void {
    this.buildForm();

    this.loadProvince();
  }

  public onAddFormArray() {
    this.isSameAddress = !this.isSameAddress;
  }

  // เลือกจังหวัด
  public onSelectProvince(formType: "other" | "residence") {
    

    if (formType === "residence") {
      let province = this.residenceForm.get("cK_SyPr")?.value as string;
      let observ1 = this.loadDataKycService
      .loadAmphure(province)
      .subscribe((amphures) => (this.amphures = amphures));
      this.subscription?.add(observ1);
    };

    if (formType === "other") {
      let province = this.otherResidenceForm.get("cK_SyPr")?.value as string;
      let observ2 = this.loadDataKycService
      .loadAmphure(province)
      .subscribe((amphures) => (this.amphureOther = amphures));
      this.subscription?.add(observ2);
    }
  }

  // เลือกอำเภอ
  public onSelectAmphure(formType: "other" | "residence") {

    if (formType === "residence") {
      let amphure = this.residenceForm.get("cK_SyAm")?.value as string;
      let observ3 = this.loadDataKycService.loadDistrict(amphure).subscribe((districts) => {
      this.districts = districts;
      this.subscription?.add(observ3);
    });
    }
    if (formType === "other") {
      let amphure = this.otherResidenceForm.get("cK_SyAm")?.value as string;
      let observ4 = this.loadDataKycService.loadDistrict(amphure).subscribe((districts) => {
      this.districtsOther = districts;
      this.subscription?.add(observ4);
    });
    }


  }

  // เลือกตำบล
  public onSelectDistrict(districts: DistrictModel[], formType: "other" | "residence") {
    if (formType === "residence") {
      this.zipCode = districts[0].code.toString();
      this.residenceForm.get('addressZipCode')?.setValue(this.zipCode);      
    }

    if (formType === "other") {
      this.zipCodeOther = districts[0].code.toString();
      this.otherResidenceForm.get('addressZipCode')?.setValue(this.zipCodeOther);
      console.log('districts >>', districts);
    }

  }

  public onNextPage() {

    if (!this.isSameAddress) {
      
      let observ5 = this.ekycService.eKycSave({
        mobileKycActionPage: "KycPage5",
        houseRegisAddress: this.residenceForm.value,
        residentAddress: this.residenceForm.value,
        sendingDocAddress: this.residenceForm.value,
      }).subscribe(res => {if (res.status) this.router.navigateByUrl("/e-kyc/KycPage5") });
      this.subscription?.add(observ5);
    }

    if (this.isSameAddress) {

      let observ6 = this.ekycService.eKycSave({
        mobileKycActionPage: "KycPage5",
        houseRegisAddress: this.residenceForm.value,
        residentAddress: this.otherResidenceForm.value,
        sendingDocAddress: this.otherResidenceForm.value,
      }).subscribe(res => {if (res.status) this.router.navigateByUrl("/e-kyc/KycPage5") });
      this.subscription?.add(observ6);
    }


  }

  private loadProvince() {
    let observ7 = this.loadDataKycService.provinces.subscribe(provinces => {
      if (provinces) {
        this.provinces = provinces;
        this.provincesOther = provinces;
      };
    })
    this.subscription?.add(observ7);
  }

  public get isDisableButton() {
    return "";
  }

  // residenceForm
  public get addressNo() {
    return this.residenceForm.get("addressNo") as AbstractControl;
  }

  public get addressStreet() {
    return this.residenceForm.get("addressStreet") as AbstractControl;
  }

  public get province() {
    return this.residenceForm.get("cK_SyPr") as AbstractControl;
  }

  public get amphure() {
    return this.residenceForm.get("cK_SyAm") as AbstractControl;
  }

  public get strict() {
    return this.residenceForm.get("cK_SyDi") as AbstractControl;
  }

  public get addressZipCode() {
    return this.residenceForm.get("addressZipCode") as AbstractControl;
  }

  onValidateOnlyNumber(e: any) {
    if ((e.keyCode === 8) || (e.keyCode >= 37 && e.keyCode <= 40)) return;
    if (e.keyCode < 48 || e.keyCode > 57) {
      this.addressZipCode.reset();
    }
  }

  private buildForm() {
    this.residenceForm = this.fb.group({
      addressNo: ["", [Validators.required]],
      addressMoo: ["", ],
      addressBuilding: ["", ],
      addressFloor: ["", ],
      addressSoi: ["", ],
      addressStreet: ["", [Validators.required]],
      addressZipCode: ["", [Validators.required, Validators.minLength(5)]],
      cK_SyPr: ["", [Validators.required]], // จังหวัด
      cK_SyAm: ["", [Validators.required]], // อำเภอ
      cK_SyDi: ["", [Validators.required]], // ตำบล
    });


    this.otherResidenceForm = this.fb.group({
      addressNo: ["", [Validators.required]],
      addressMoo: ["", ],
      addressBuilding: ["", ],
      addressFloor: ["", ],
      addressSoi: ["", ],
      addressStreet: ["", [Validators.required]],
      addressZipCode: ["", [Validators.required]],
      cK_SyPr: ["", [Validators.required]], // จังหวัด
      cK_SyAm: ["", [Validators.required]], // อำเภอ
      cK_SyDi: ["", [Validators.required]], // ตำบล
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
