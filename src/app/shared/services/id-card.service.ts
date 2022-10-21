import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IdCardRespone } from "../../shared/models/index-model";

@Injectable({ providedIn: "root" })
export class IdCardService {
  private readonly AIGEN_API: string = environment.aigen_key;
  constructor(private _http: HttpClient) {}

  compair(body: any): Observable<IdCardRespone> {
    return this._http.post<IdCardRespone>(this.AIGEN_API, body, {
      headers: {
        "X-AIGEN-KEY": "PDniyfjawvs6godilho432jli154r97e4q",
      },
    });
  }
}
