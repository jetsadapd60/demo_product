import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({providedIn: "root"})
export class ToggleAccountService {

    private isShow = new BehaviorSubject<boolean>(false);

    get isShowCustomAccount$(): Observable<boolean> {
        return this.isShow.asObservable();
    }

    public show() {
        this.isShow.next(true);
    }

    public hidded() {
        this.isShow.next(false);
    }
}