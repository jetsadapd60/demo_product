import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Notifacation } from "./notification.model";

@Injectable()
export class NotificationService {

    private noti = new Subject<Notifacation | undefined>();
    public noti$ = this.noti.asObservable();

    show(initNoti: Notifacation) {
        this.noti.next(initNoti);
    }

    hide() {
        this.noti.next(undefined);
    }

}