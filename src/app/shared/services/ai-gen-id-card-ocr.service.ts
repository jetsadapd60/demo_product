import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, map, Observable, Subject, Subscription, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { IdCardRespone } from "../../shared/models/index-model";
import { EKycService } from "./e-kyc.service";
import { ConverDate } from "../../utils/index-util";

@Injectable()
export class AiGenIdCardService implements OnDestroy {
  private readonly AIGEN_KEY: string = environment.aigen_key;
  subscription!: Subscription;

  public isSameCompare = false;
  private imageView = new BehaviorSubject<string | undefined>(undefined);
  private buttonStatus = new BehaviorSubject<boolean>(false);

  public imageView$ = this.imageView.asObservable();
  public buttonStatus$ = this.buttonStatus.asObservable();


  private personalInformation: any = {
    firstName: "",
    lastName: "",
    idCard: "",
    birthDay: "",
  };

  constructor(private _http: HttpClient, private ekycService: EKycService) {
    this.loadEKycData();
  }

  private loadEKycData() {
    let observ1 = this.ekycService.eKyc$.subscribe((res: any) => {
      let ekycData = { ...res };

      if (ekycData) {
        for (let item in this.personalInformation) {
          if (item === "birthDay") {
            ekycData[item] = ConverDate.thaiToGlobal(ekycData[item]);
          }
          this.personalInformation[item] = ekycData[item];
        }
      }
    });

    this.subscription?.add(observ1);
  }

  // รูปบัตรปปช. แบบ base64
  public emitImageBase64(base64: string) {
    // console.log('base64 >>>', base64);
    
    this.imageView.next(base64);
  }

  public idCardOcr(imageBase64: string): Observable<any> {

    let body = {
      image: imageBase64,
      return_face: false,
      return_gender: true,
      return_signed: false,
      do_text_correct: false,
    };
// console.log(body);

    return this._http
      .post<IdCardRespone>(
        "https://apis.aigen.online/aiscript/idcard/v1",
        body,
        { headers: { "X-AIGEN-KEY": this.AIGEN_KEY } }
      )
      .pipe(
        map((res) => {

          // ข้อมูลบัตรปปช.จาก aigen
          const { dob_th, title_name_surname_th, id_number } = res.result.field;
          // แยก ชื่อ นามสกุล ที่ได้จาก aigen เก็บใน array เช่น นาย สามารถ กระทิ เป็น ["สามารถ", "กระทิ"]
          const fullName: string[] = title_name_surname_th.value.split(" ");
          // ตัดช่องว่างรหัสบัตรปปช. ที่ได้จาก ainget เช่น 8 8433 82443 41 2 เป็น 8843382443412
          const idCard = this.cutSpacing(id_number.value);

          const data = {
            firstName: fullName[1],
            lastName: fullName[2],
            idCard,
            birthDay: dob_th.value,
          };
          console.log('id card >>', res)
          return this.comparePersonalInformation(data);
          // return res;
        })
      );
  }

  private comparePersonalInformation(data: any) {
    // console.log('aigen >>', data)
    // console.log('api >>', this.personalInformation)
    let correct = false;
    let msg = "";
    let itemCompareIsError: any;
    for (let item in data) {
      if (data[item] !== this.personalInformation[item]) {
        correct = false;
        this.buttonStatus.next(false)
        msg = `${item} ไม่ถูกต้อง`;
        console.log("ข้อมูล api", this.personalInformation[item])
        console.log("ข้อมูล aigen", data[item])
        console.log("compare false >>", item);
        itemCompareIsError = {
          fildeName: item,
          value1: this.personalInformation[item],
          value2: data[item]
        }
        break;
      } else {
        this.buttonStatus.next(true)
        correct = true;
        msg = `ถูกต้อง`;
        console.log("compare true >>", item);
      }
    }

    return { state: correct, msg, itemCompareIsError};
  }

  // ตัดช่องว่างของข้อความ
  private cutSpacing(data: string): string {
    let text = "";
    for (let i = 0; i < data.length; i++) {
      if (data[i] === " ") {
        continue;
      }
      text += data[i];
    }
    return text;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
