import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModifyAccountService } from "../../../../shared/services/modify-account.service";
import { ToggleAccountService } from "./toggle-account.service";

@Component({
  selector: "app-custom-account",
  templateUrl: "./custom-account.component.html",
  styleUrls: ["./custom-account.component.scss"],
})
export class CustomAccountComponent implements OnInit {
  accountForm!: FormGroup;

  constructor(
    public toggleAccount: ToggleAccountService,
    private modifyAccountService: ModifyAccountService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildForm();

    this.loadAccount();
  }

  loadAccount() {
    this.modifyAccountService.loadAccount$.subscribe((res) => {

      if (res) {
        // const {
        //   profileImage, firstName, lastName, cK_SyBa, bankAccountNo,
        //   bookBankImage, cK_SyCo_PhoneNumber, phoneNumber, email, addressView, houseRegisAddress,
        // } = res;

        // this.accountForm.get("firstName")?.setValue(firstName);
        // this.accountForm.get("phoneNumber")?.setValue(phoneNumber);
        // this.accountForm.get("email")?.setValue(email);

        // // set value address
        // if (houseRegisAddress) {
          
        // }
      }
    });
  }

  onSaveEditProfile() {
    console.log(this.accountForm.get("houseRegisAddress")?.value);
  }

  private buildForm() {
    this.accountForm = this.fb.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      cK_SyBa: ["", [Validators.required]],
      bankAccountNo: ["", [Validators.required]],
      bookBankImage: ["", [Validators.required]],
      cK_SyCo_PhoneNumber: ["", [Validators.required]],
      phoneNumber: ["", [Validators.required]],
      email: ["", [Validators.required]],
      addressView: ["", [Validators.required]],
      houseRegisAddress: this.fb.group({
        addressNo: ["", [Validators.required]],
        addressMoo: ["", [Validators.required]],
        addressBuilding: ["", [Validators.required]],
        addressFloor: ["", [Validators.required]],
        addressSoi: ["", [Validators.required]],
        addressStreet: ["", [Validators.required]],
        addressZipCode: ["", [Validators.required]],
        cK_SyPr: ["", [Validators.required]],
        cK_SyAm: ["", [Validators.required]],
        cK_SyDi: ["", [Validators.required]],
      }),
    });
  }
}
