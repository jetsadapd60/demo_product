import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
} from "@angular/router";
import { EKycPage3Component } from "../pages/index";

@Injectable()
export class UnsaveChangesGuard
  implements CanDeactivate<EKycPage3Component>
{
  canDeactivate(
    component: EKycPage3Component,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot | undefined
  ): boolean {

    console.log(component.personalDetailForm)

    return confirm("ต้องการออกจากหน้านี้ใช่ไหม");
  }
}
