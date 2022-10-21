import { Component, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { NotificationService } from "src/app/shared/components/notification/notification.service";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-registor-form-normal",
  templateUrl: "./registor-form-personal.component.html",
  styleUrls: ["./registor-form-personal.component.scss"],
})
export class RegistorFormNormalComponent implements OnDestroy {
  public isHidePass: boolean = false;
  public isHideConfirmPass: boolean = false;
  private subscription!: Subscription;
  public registorForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notiService: NotificationService
  ) {
    this.buildForm();
  }

  // show or hide password input control
  public onToggleShowPass(): void {
    this.isHidePass = !this.isHidePass;
  }

  public onRegistor(): void {
    const { confirm, ...registor } = this.registorForm.value;
    let observ1 = this.authService.registor(registor).subscribe((res) => {
      console.log(res);
      if (res.status) this.router.navigateByUrl("/auth/opt-sms-verification");
      if (!res.status) {
        this.notiService.show({
          head: "Failed",
          title: res.message,
          type: "Failed",
          stype: {
            // icon?: ,
            // bgColor?: ,
            // color?: ,
            // fontSize?: ,
          },
        });
      }
    });
    this.subscription?.add(observ1);
  }

  // Getter
  public get phone() {
    return this.getControl("phoneNumber");
  }
  public get email() {
    return this.getControl("email");
  }
  public get password() {
    return this.getControl("password");
  }
  public get confirm() {
    return this.getControl("confirm");
  }

  // Build Form
  private buildForm(): void {
    this.registorForm = this.fb.group(
      {
        email: [
          "",
          [
            Validators.required,
            Validators.pattern("[A-Za-z0-9._]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}"),
          ],
        ],
        password: [
          "",
          [
            Validators.required,
            Validators.pattern(
              "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{5,20}"
            ),
          ],
        ], //ความยาวอย่างน้อย 8 ตัวอักษร, ตัวพิมพ์เล็ก, ตัวพิมพ์ใหญ่, ตัวเลข, อักขระพิเ]ษ
        confirm: ["", [Validators.required]],
        countryCode: [""],
        phoneNumber: ["", [Validators.required, Validators.minLength(10)]],
        chkTermofService: [true],
        chkPolicy: [true],
        memberType: ["P"],
        registerSource: ["Mobile"],
      },
      {
        validator: ConfirmedValidator("password", "confirm"),
      }
    );
  }

  private getControl(contrl: string) {
    return this.registorForm.get(contrl) as FormGroup;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

function ConfirmedValidator(controlName: string, matchingControlName: string) {
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
  };
}
