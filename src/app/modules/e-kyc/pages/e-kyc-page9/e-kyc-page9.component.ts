import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { WebcamImage, WebcamInitError, WebcamUtil } from "ngx-webcam";
import { Subscription } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { Subject } from "rxjs/internal/Subject";
import {
  AiGenFaceCompareService,
  AiGenIdCardService,
  EKycService,
} from "../../../../shared/services/index-service";
import { Base64 } from "../../../../utils/index-util";

@Component({
  selector: "app-camera-page",
  templateUrl: "e-kyc-page9.component.html",
  styleUrls: ["e-kyc-page9.component.scss"],
})
export class EKycPage9Component implements OnInit, OnDestroy {
  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string = "";
  public facingMode: string = "environment";
  public messages: any[] = [];
  private imageUrl = "";
  private subscription!: Subscription;
  public buttonStatus = true;

  // latest snapshot
  public webcamImage!: WebcamImage;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string >();

  constructor(
    private router: Router,
    private ekycService: EKycService,
    private aiGenFaceCompareService: AiGenFaceCompareService
  ) {
    let observ1 = this.ekycService.eKyc$.subscribe((res) => {
      this.imageUrl = `http://203.150.199.17/AusirisBackendApi/${res.idCardImage}`;
    });
    this.subscription?.add(observ1);
  }

  public ngOnInit(): void {
    this.readAvailableVideoInputs();
  }

  toDataURL(url: any, callback: any) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
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

  // กดถ่ายหน้า
  public handleImage(webcamImage: WebcamImage): void {
    
    this.buttonStatus = false;
    this.toDataURL(this.imageUrl, (dataUrl: any) => {
      let faceIamgeByCapture = Base64.modify(webcamImage.imageAsDataUrl);
      let idCardImageByApi = dataUrl.replace("data:", "").replace(/^.+,/, "");

      // return console.log(faceIamgeByCapture)
      // ส่งรูปบัตรปปช. กับ รูปหน้า ไปให้ aigen เปรียบเทียบ
      // มากกว่า 70 % ผ่าน แล้วไปหน้าที่10
      // ตำ่กว่า 70 % ไม่ให้ผ่าน
      let observ2 = this.aiGenFaceCompareService
        .faceCompare(idCardImageByApi, faceIamgeByCapture)
        .subscribe({
          next: (res) => {
            console.log(res);
            
            if (res.confidence >= 50) {
              console.log(res);
              
              let observ3 = this.ekycService.eKycSave({mobileKycActionPage: "KycPage10"}).subscribe({
                next: res => {
                  if (res.status) {
                    this.router.navigateByUrl('/e-kyc/KycPage10');
                  }
                },
                error: err => {
                  console.log(err);
                  this.buttonStatus = true;
                }
              });
              this.subscription?.add(observ3)
            }
            if (res.confidence < 50) {
              console.log(res);
              alert("ใบหน้าไม่ตรงกับในบัตรปปช");
              let isConfirm = confirm("กลับไปเปลี่ยนบัตรปปช.")
              if (isConfirm) {
                this.router.navigateByUrl('/e-kyc/KycPage6');
              } else {
                this.buttonStatus = true;
              }
            }
          },
          error: err => {console.log(err)}
        });
        this.subscription?.add(observ2);
    });
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
