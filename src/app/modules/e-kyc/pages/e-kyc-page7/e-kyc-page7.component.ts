import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { WebcamImage, WebcamInitError, WebcamUtil } from "ngx-webcam";
import { Subscription } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { Subject } from "rxjs/internal/Subject";
import { AiGenIdCardService } from "../../../../shared/services/index-service";
import { Base64 } from "../../../../utils/index-util";

@Component({
  selector: "app-camera-id-card-page",
  templateUrl: "e-kyc-page7.component.html",
  styleUrls: ["e-kyc-page7.component.scss"],
})
export class EKycPage7Component implements OnInit, OnDestroy {
  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string = "";
  public facingMode: string = "environment";
  public messages: any[] = [];
  private subscription!: Subscription;
  // latest snapshot
  public webcamImage!: WebcamImage;
  public buttonStatus = true;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  constructor(private router: Router, private aigenIdCardService: AiGenIdCardService) {}

  public ngOnInit(): void {
    this.readAvailableVideoInputs();
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.messages.push(error);
    if (
      error.mediaStreamError &&
      error.mediaStreamError.name === "NotAllowedError"
    ) {
      this.addMessage("User denied camera access");
    }
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  // กดถ่ายรูปบัตรปปช.
  public handleImage(webcamImage: WebcamImage): void {

    let base64 = webcamImage.imageAsDataUrl;
    // console.log(base64)
    // console.log(Base64.modify(base64))
    this.buttonStatus = false;
    // หลังจากกดถ่ายรูป 
    // ส่งรูปไป aigen ถ้าเทียบข้อมูลบนบัตรกับข้อมูลที่กรอกถูกต้อง จะโยนรูป แบบbase64 ออกไปด้วย
    // และจะย้อนไปที่หน้า6
    // ถ้าไม่ถูกต้อง จะให้เลือกถ่ายรูปใหม่ หรือ กลับไปหน้า3 เพื่อกรอกข้อมูลใหม่
    let observ1 = this.aigenIdCardService.idCardOcr(Base64.modify(base64))
    .subscribe({
      next: ({state, msg, itemCompareIsError}) => {

        // ใบหน้าตรงกับบัตรปปช.
        if (state) {
          this.aigenIdCardService.emitImageBase64(base64);
          this.router.navigateByUrl("/e-kyc/KycPage6");
        }

        // ใบหน้าไม่ตรงกับบัตรปปช.
        if (!state) {
          const {fildeName, value1, value2} = itemCompareIsError;
          if (confirm(`ข้อมูล ${fildeName} (${value1} ไม่ตรง ${value2}) ไม่ตรงกับที่กรอก \n ต้องการส่งรูปใหม่ หรือ กรอกข้อมูลใหม่ ?`)) {
            this.router.navigateByUrl("/e-kyc/KycPage3-error");
          } else {
            this.buttonStatus = true;
          }
        }
      },
      error: (err: HttpErrorResponse) => {
        let error_code: string = err.error.error_code;
        if (error_code === "001") {
          alert("ไม่ใช่บัตรปปช.")
          this.buttonStatus = true;
        }
        else if (error_code === "002") {
          alert("ไม่มีรูปบัตรปปช.")
          this.buttonStatus = true;
        } else {
          alert('503 (Service Unavailable)')
        }
      }
    });

    this.subscription?.add(observ1);
  }

  public cameraWasSwitched(deviceId: string): void {
    this.addMessage("Active device: " + deviceId);
    this.deviceId = deviceId;
    this.readAvailableVideoInputs();
  }

  addMessage(message: any): void {
    console.log(message);
    this.messages.unshift(message);
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  public get videoOptions(): MediaTrackConstraints {
    const result: MediaTrackConstraints = {};
    if (this.facingMode && this.facingMode !== "") {
      result.facingMode = { ideal: this.facingMode };
    }

    return result;
  }

  private readAvailableVideoInputs() {
    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
