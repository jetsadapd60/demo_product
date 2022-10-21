import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { SetupPinRequest } from "../models/setup-pin-request.model";

@Injectable()
export class SetupPinService {

    private readonly BASE_URL: string = environment.base_utl;

    constructor(private _http: HttpClient) {}

    setupPin(dataSetupPin: SetupPinRequest) {
        return this._http.post(`${this.BASE_URL}AusirisBackendApi/FrontendMember/SetPin`, dataSetupPin);
    }

}