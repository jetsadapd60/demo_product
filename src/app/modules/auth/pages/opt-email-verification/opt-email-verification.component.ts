import { AfterContentInit, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { OtpService } from "src/app/shared/services/otp.service";
import { NotificationService } from "src/app/shared/components/notification/notification.service";
import { OtpRequest } from "src/app/shared/models/otp-request.model";
import { OtpRespone } from "src/app/shared/models/otp-respone.model";
import { getStoreage } from "./../../../../utils/index-util";

@Component({
  selector: "app-opt-email-verification",
  templateUrl: "./opt-email-verification.component.html",
  styleUrls: ["./opt-email-verification.component.scss"],
})
export class OptEmailVerificationComponent implements OnInit, AfterContentInit {
  public otpForm!: FormGroup;
  public otpType: "SMS" | "EMAIL" | "SMS-ONLY" = "EMAIL";
  public isOtpError = false;

  constructor(
    private fb: FormBuilder,
    private OtpService: OtpService,
    private router: Router,
    private notiService: NotificationService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buildForm();

    const { otpType } = this.activatedRoute.snapshot.data;
    this.otpType = otpType;
    console.log(this.otpType);
  }

  ngAfterContentInit(): void {
    this.initial();
  }

  // request otp try agian
  // ขอ OTP อีกครั้ง
  onTryAgainOtp() {
    const accId: string | undefined = getStoreage("accId")?.toString();

    if (accId) {
      this.OtpService.tryAgainOtp(accId, this.otpType).subscribe((res) => {
        console.log(res);
      });
    }
  }

  /**
   *  ยืนยัน EMAIL OTP
   */
  private verifyEmail() {
    const otpVerify: OtpRequest = {
      accId: getStoreage("accId") || "",
      otpEmail: this.getOtpNumber,
    };

    this.OtpService
      .verifyOtp(otpVerify, this.otpType)
      .subscribe((res: OtpRespone) => {
      if (res.status) {
        this.isOtpError = false;
        this.router.navigateByUrl("/auth/pin-setup");
      };
      if (!res.status ) this.isOtpError = true;
    });
  }

  /**
   * ยืนยัน SMS OTP
   */
  private verifySms() {
    const otpVerify: OtpRequest = {
      accId: getStoreage("accId") || "",
      otpSms: this.getOtpNumber,
    };

    this.OtpService
      .verifyOtp(otpVerify, this.otpType)
      .subscribe((res: OtpRespone) => {
      if (res.status) {
        this.isOtpError = false;
        this.router.navigateByUrl("/auth/opt-email-verification")
      };
      if (!res.status ) this.isOtpError = true;
    });
  }

  /**
   *
   */
  private initial() {
    const inputs: any = document.querySelectorAll("#otpInput");

    inputs.forEach((input: any, index: number) => {
      if (index === 0) inputs[index].focus();

      input.addEventListener("keyup", (event: any) => {
        if (event.key === "Backspace") {
          if (index !== 0) inputs[index - 1].focus();
        } else {
          // if (index === inputs.length - 1 && inputs[index].value !== "") return true;

          // between asii key 48 to 57
          if (event.keyCode > 47 && event.keyCode < 58) {
            inputs[index].value = event.key;
            // จั้ม input ถัดไป
            if (index !== inputs.length - 1) inputs[index + 1].focus();
            // ถ้ากรอก otp ครบแล้ว
            if (index === inputs.length - 1) {
              if (this.otpType === "SMS") this.verifySms();
              if (this.otpType === "EMAIL") this.verifyEmail();
            }
          }

          // not number
          if (event.keyCode > 64 && event.keyCode < 91) {
            this.notiService.show({
              head: "ผิดพลาด",
              title: "เฉพาะตัวเลขเท่านั้น",
              type: "Failed",
              stype: { icon: "bi bi-asterisk" },
            });
          }
        }
      });
    });
  }


  // Create Form for OTP number
  private buildForm(): void {
    this.otpForm = this.fb.group({
      first: [null, Validators.required],
      second: [null, Validators.required],
      third: [null, Validators.required],
      fourth: [null, Validators.required],
      fifth: [null, Validators.required],
      six: [null, Validators.required],
    });
  }

  private get getOtpNumber(): string {
    const { first, second, third, fourth, fifth, six } = this.otpForm.value;
    return `${first}${second}${third}${fourth}${fifth}${six}`;
  }
}