import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Notifacation } from './notification.model';
import { NotificationService } from './notification.service';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnDestroy {

  private subscription!: Subscription;
  public noti: Notifacation | undefined;
  public currentTime: any;


  constructor(private notiService: NotificationService) {
    this.subscription = this.notiService.noti$
    .subscribe((notiData: Notifacation | undefined) => {
      if (notiData) {
        this.noti = notiData;
        this.currentTime = new Date().getTime();
        console.log(notiData);
        // setTimeout(() => {
        //   this.onCloseMessage();
        // }, 4000);
      };
 

    });
  }

  onCloseMessage() {
    this.noti = undefined;
    this.notiService.hide();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
