import { HttpErrorResponse } from "@angular/common/http";
import { Component, ElementRef, OnDestroy, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import {
  AiGenIdCardService,
  EKycService,
} from "../../../../shared/services/index-service";
import { Base64 } from "../../../../utils/index-util";

@Component({
  selector: "app-personal-scan-id-card",
  templateUrl: "e-kyc-page6.component.html",
  styleUrls: ["e-kyc-page6.component.scss"],
})
export class EKycPage6Component implements OnDestroy {
  @ViewChild("inputfile") public inputfile!: ElementRef;
  @ViewChild("imageFile") public imageFile!: ElementRef;
  idCardPreview = "../../../../../assets/images/plus.svg";
  private subscription!: Subscription;
  preview = "";
  isMatching = false;

  constructor(
    private router: Router,
    private aigenIdCardService: AiGenIdCardService,
    private ekycService: EKycService
  ) {
    this.aigenIdCardService.buttonStatus$.subscribe(res=>{
      console.log('btn >>>', res);
      this.isMatching = res;
    })
    let observ1 = this.aigenIdCardService.imageView$.subscribe((res) => {
      if (res) {
        this.preview = res;
      } else {
        this.preview = "";
      }
    });
    this.subscription?.add(observ1);
  }

  selectIdCard(event: any) {
    const base64 = "data:image/png;base64,";
    const file = event.target.files[0];
    let reader = new FileReader();

    //
    reader.onload = (e) => {
      if (e.target?.result) {
        let image = (e.target.result as string).substring(base64.length);
        this.aigenIdCardService.emitImageBase64(e.target?.result as string);

        // ส่งรูปบัตรปปช.ไป aigen
        let observ2 = this.aigenIdCardService.idCardOcr(image).subscribe({
          next: (res) => {
            // มูลในบัตร กับ ข้อมูลที่กรอกตรงกัน
            if (res.state) {
              this.isMatching = res.state;
            } else {
              // มูลในบัตร กับ ข้อมูลที่กรอก ไม่ ตรงกัน
              // แสดง confirm เลือก
              let isConfirm: boolean = confirm(
                `ข้อมูล ${res.msg} ในบัตรปปช. ไม่ตรงกับข้อมูลที่กรอก \n ต้องการส่งรูปใหม่ หรือ กรอกข้อมูลใหม่ ?`
              );

              // กด yes กลับไปหน้าที่3
              if (isConfirm) {
                this.imageFile.nativeElement.value = "";
                this.preview = "";
                this.router.navigateByUrl("/e-kyc/KycPage3-error");
              }

              // กด cancel
              // ล้างข้อมูลใน input type file
              // ล้างข้อมูลใน preview
              if (!isConfirm) {
                this.imageFile.nativeElement.value = "";
                this.preview = "";
              }
            }
          },
          error: (err: HttpErrorResponse) => {
            let error_code: string = err.error.error_code;
            if (error_code === "001") {
              alert("no idcard on image")
            }
            else if (error_code === "002") {
              alert("missing or invalid input")
            } else {
              alert('503 (Service Unavailable)')
            }
          },
        });
        
        this.subscription?.add(observ2);
      }
    };
    reader.readAsDataURL(file);
  }

  onNextPage() {
    console.log(Base64.modify(this.preview))
    if (this.isMatching) {
      let observ3 = this.ekycService
        .eKycSave({
          mobileKycActionPage: "KycPage8",
          idCardImage: Base64.modify(this.preview),
        })
        .subscribe({
          next: (res) => {
            if (res.status) this.router.navigateByUrl("/e-kyc/KycPage8");
          },
          error: (err) => {
            console.log(err)
          }
        });

        this.subscription?.add(observ3);
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
