import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardRoutingMoudule } from "./dashboard-routing.module";

import { DashboardComponent } from "./dashboard.component";
import { DashboardTopComponent } from "./components/dashboard-top/dashboard-top.component";
import { DashboardSideComponent } from "./components/dashboard-side/dashboard-side.component";
import {
  ContactComponent,
  DashboardAssetComponent,
  DashboardBuySaleComponent,
  DashboardHomeComponent,
  DashboardReceivePayComponent,
  HelpSupportComponent,
} from "./pages/index-page";

import { EKycService, BankNameService, ModifyAccountService } from "../../shared/services/index-service";
import { CustomAccountModule } from "./components/custom-account/custom-account.module";

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardTopComponent,
    DashboardSideComponent,
    DashboardHomeComponent,
    DashboardBuySaleComponent,
    DashboardAssetComponent,
    DashboardReceivePayComponent,
    ContactComponent,
    HelpSupportComponent,
  ],
  imports: [CommonModule, DashboardRoutingMoudule, CustomAccountModule,],
  providers: [EKycService, BankNameService, ModifyAccountService],
})
export class DashboardModule {}
