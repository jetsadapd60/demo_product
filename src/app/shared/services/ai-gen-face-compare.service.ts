import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { FaceCompareModel } from "../models/face-compare.model";

@Injectable()
export class AiGenFaceCompareService {
    private readonly AIGEN_API = "https://apis.aigen.online/aiface/face-compare/v1";
    private readonly AIGEN_KEY: string = environment.aigen_key;

    constructor(private _http: HttpClient) {}

    faceCompare(idCardImage: string, faceImage: string): Observable<FaceCompareModel> {

        const data = { 
            image1: idCardImage,
            image2: faceImage,
          };

        return this._http.post<FaceCompareModel>(this.AIGEN_API, data, { headers: { "X-AIGEN-KEY": this.AIGEN_KEY } });

    }
    
}