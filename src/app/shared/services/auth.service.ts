// angular
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject, map, Observable, tap } from "rxjs";

// enviroment
import { environment } from "../../../environments/environment";
// service
import { NotificationService } from "../components/notification/notification.service";
// utils
import { setStoreage } from "../../utils/index-util";
// models
import {
  LoginRespone,
  LoggedIn,
  ResponePResponeData,
} from "../models/index-model";
import { Router } from "@angular/router";

interface AuthData {
  isLoggedIn: boolean;
  token: string;
}

@Injectable()
export class AuthService {

  private BASE_URL: string = environment.base_utl;
  private loggedIn = new BehaviorSubject<boolean>(false);
  public loggedIn$ = this.loggedIn.asObservable();
  public login$ = this.loggedIn.value;

  constructor(
    private _http: HttpClient,
    private notiService: NotificationService,
    private router: Router
  ) {}

  /**
   *
   * @param dataRegistor
   * @returns
   */
  public registor(
    dataRegistor: ResponePResponeData
  ): Observable<ResponePResponeData> {
    return this._http
      .post<any>(
        `${this.BASE_URL}AusirisBackendApi/FrontendMember/Register`,
        dataRegistor
      )
      .pipe(
        tap((res) => {
          if (res.status) {
            setStoreage("accId", res.data.accID);
            this.router.navigateByUrl("/auth/opt-sms-verification");
          }

          if (!res.status) {
            localStorage.clear();
          }
        })
      );
  }

  /**
   *
   * @param data
   * @returns
   */
  public login(data: LoggedIn) {
    return this._http
      .post<LoginRespone>(
        `${this.BASE_URL}AusirisAccountCenterApi/Auth/Login`,
        data
      )
      .pipe(
        tap((res) => {
          if (res.status) {
            setStoreage("isLoggedIn", true);
            setStoreage("token", res.data.token);
            setStoreage("email", res.data.email);
          }
        })
      );
  }

  /**
   *
   */
  public loggedOut(): void {
    localStorage.clear();
    this.nextStreem(false);
    if (!localStorage.getItem("token")) {
      this.router.navigateByUrl("/auth/login");
    }
  }

  /**
   *
   * @param value
   */
  public nextStreem(value: boolean) {
    this.loggedIn.next(value);
  }
}
