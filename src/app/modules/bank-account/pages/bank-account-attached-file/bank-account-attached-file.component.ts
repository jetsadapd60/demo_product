import { Component, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { BankNameDataModel } from "../../../../shared/models/bank-name.model";
import { BankAccountService, BankNameService } from "../../../../shared/services/index-service";
import { Base64 } from "../../../../utils/index-util";


@Component({
  selector: "app-bank-account-attached-file",
  templateUrl: "./bank-account-attached-file.component.html",
  styleUrls: ["./bank-account-attached-file.component.scss"],
})
export class BankAccountAttachedFileComponent implements OnInit, OnDestroy {
  public bankNames: BankNameDataModel[] = [];
  public preview: string = "";
  public idCardPreview = "../../../../../assets/images/plus.svg";
  public accountInformationFrom!: FormGroup;
  private subscription!: Subscription;

  constructor(
    private bankNameService: BankNameService,
    private fb: FormBuilder,
    private bankAccountService: BankAccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBankName();
    this.buildFrom();
  }

  selectIdCard(event: any) {
    const base64 = "data:image/png;base64,";
    const file = event.target.files[0];
    let reader = new FileReader();

    //
    reader.onload = (e) => {
      if (e.target?.result) {
        let image = Base64.modify(e.target?.result as string);
        this.preview = e.target?.result as string;
        console.log(e.target?.result)
        this.accountInformationFrom.get("bookBankImage")?.setValue(image);
      }
    };
    reader.readAsDataURL(file);
  }

  saveBankAcctount() {

    let observ1 = this.bankAccountService
      .saveBankAccount({ ...this.accountInformationFrom.value })
      .subscribe({
        next: res => {
          if (res.status) this.router.navigateByUrl("/bank-account/KycPage14");
        },
        error: err => {
          console.log(this.accountInformationFrom.value)
        }
      });

      this.subscription?.add(observ1);
  }

  getBankName() {
    let observ2 = this.bankNameService.bankName$.subscribe((res) => {
      if (res) this.bankNames = res;
    });
    this.subscription?.add(observ2);
  }

  get bookBankImage() {
    return this.accountInformationFrom.get("bookBankImage") as AbstractControl
  }

  get cK_SyBa() {
    return this.accountInformationFrom.get("cK_SyBa") as AbstractControl
  }

  get bankAccountNo() {
    return this.accountInformationFrom.get("bankAccountNo") as FormGroup
  }

  private buildFrom() {
    this.accountInformationFrom = this.fb.group({
      mobileBankAccActionPage: ["BankAccountPageEnd", [Validators.required]],
      fK_SyACTy: ["fbc22590-9f79-4b9a-856e-5aeb3655c9a1", [Validators.required]],
      cK_SyBa: ["", [Validators.required]],
      bankAccountNo: ["", [Validators.required]],
      bookBankImage: [null, [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
