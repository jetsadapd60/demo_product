import {
  AfterViewInit,
  Component,
  ElementRef,

  OnDestroy,

  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import { SetupPinService } from "src/app/shared/services/setup-pin.service";
import { SetupPinRequest } from "src/app/shared/models/setup-pin-request.model";
import { Subscription } from "rxjs";

type PinStatus = "entered" | "success" | "error";

@Component({
  selector: "enter-pin",
  templateUrl: "./enter-pin.component.html",
  styleUrls: ["./enter-pin.component.scss"],
})
export class EnterPinComponent implements AfterViewInit, OnDestroy {

  public pinArray: number[] = [];
  public isShowPin: boolean = false;
  private subscription!: Subscription;
  private isConfirmPin: boolean = false;

  constructor(
    private setupPinService: SetupPinService,
    private router: Router
  ) {}

  @ViewChild("pinInput") public pinInput: ElementRef | undefined;

  ngAfterViewInit(): void {
    this.pointerFocus();
    this.keyNumber();

    this.bindPinToDots(this.pinArray);
  }

  bindPinToDots(pinArray: number[], pinStatus?: PinStatus) {
    const dots = document.querySelectorAll(".enter-pin__dot");
    dots.forEach((dot: any, dotIndex: number) => {
      if (pinStatus === "success") {
        dot.classList.add("enter-pin__dot--success");
      } else if (pinStatus === "error") {
        dot.classList.add("enter-pin__dot--error");
      } else if (dotIndex > pinArray.length - 1) {
        dot.classList.remove("enter-pin__dot--entered");
        dot.classList.remove("enter-pin__dot--success");
        dot.classList.remove("enter-pin__dot--error");
      } else {
        dot.classList.add("enter-pin__dot--entered");
      }
    });
  }

  // setup pin
  private setupPin() {
    const accId: string | undefined = localStorage.getItem("accId")?.toString();
    const pin: string = this.pinArray.join("");

    const pinSetup: SetupPinRequest = {
      accId: accId || "",
      pinNumber: pin,
    };

    let observ1 = this.setupPinService.setupPin(pinSetup).subscribe((res: any) => {
      if (!res.status) {
        console.log(res)
        return
      }
      this.router.navigateByUrl("/auth/finish");
    });

    this.subscription?.add(observ1)
  }

  /**
   * กำหนดค่าของการกดตัวเลข
   * 1.กรอกได้เฉพาะ 0 - 9
   * 2.ได้ไม่เกิน 6 ตัว
   * 3.แต่ละครั้งที่กรอก จะเพิ่มไปใน pinArray
   * 4.ถ้ากด Backspace จะลบข้อมูลใน pinArray จากหลังไปหน้า
   */
  private keyNumber() {
    const input: any = document.querySelector("#pinInput");

    input.addEventListener("keyup", (event: any) => {
      let { keyCode, key } = event;

      if (keyCode > 47 && keyCode < 58) {
        if (this.pinArray.length < 6) {
          // เพิ่ม
          let pin = +event.key;
          this.pinArray.push(pin);
          this.bindPinToDots(this.pinArray);
        }

        // บันทึก
        if (this.pinArray.length === 6) {
          this.setupPin();
        }
      } else if (key === "Backspace") {
        // ลบ
        if (this.pinArray.length > 0) {
          this.pinArray.pop();
          this.bindPinToDots(this.pinArray);
        }
      }
    });
  }

  pointerFocus() {
    if (!this.pinInput) return;
    this.pinInput.nativeElement.focus();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
