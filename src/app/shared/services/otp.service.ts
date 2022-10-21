import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { OtpRequest } from "../models/otp-request.model";
import { OtpRespone } from "../models/otp-respone.model";
import { NotificationService } from "../components/notification/notification.service";
import { Router } from "@angular/router";

@Injectable()
export class OtpService {
  private readonly BASE_URL: string = environment.base_utl;

  constructor(
    private _http: HttpClient,
    private notiService: NotificationService,
    private router: Router
  ) {}

  public verifyOtp(dataOtp: OtpRequest, otpType: "SMS" | "EMAIL" | "SMS-ONLY"): Observable<OtpRespone> {
    return this._http
      .post<OtpRespone>(
        `${this.BASE_URL}${otpType === "SMS" ? 'AusirisBackendApi/FrontendMember/OtpActivateSms' : 'AusirisBackendApi/FrontendMember/OtpActivateEmail'}`,
        dataOtp
      );
  }

  tryAgainOtp(accId: string, otpType: "SMS" | "EMAIL" | "SMS-ONLY"): Observable<any> {
    let pathUrl = otpType === "EMAIL" ? "AusirisBackendApi/FrontendMember/NewOtpActivateEmail/" : "AusirisBackendApi/FrontendMember/NewOtpActivateSms/";
    const path = `${this.BASE_URL}${pathUrl}${accId}`;
    return this._http.get(path).pipe(
      tap((res: any) => {
        if (res) {
          this.notiService.show({
            head: "Success",
            title: res.message,
            type: "Success",
            stype: { icon: "" },
          });
        }

        if (!res) {
          this.notiService.show({
            head: "Error",
            title: res.message,
            type: "Failed",
            stype: { icon: "" },
          });
        }
      })
    );
  }
}
