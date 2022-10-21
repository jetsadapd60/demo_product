import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavigationService implements OnDestroy {

  private subscription!: Subscription;
  private history: string[] = [];
  constructor(private router: Router, private location: Location) {
    this.saveHhstory();
  }
 
  private saveHhstory() {
    let observ1 = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    });
    this.subscription?.add(observ1);
  }

  public getHistory():string[] {
    return this.history;
  }

  public goBack(): void {
    this.history.pop();
    console.log(this.history)

    if (this.history.length > 0) {
      this.location.back();
    } else {
      this.router.navigateByUrl('/');
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
}
