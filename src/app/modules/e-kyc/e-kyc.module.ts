import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { EKycComponent } from "./e-kyc.component";
import { EKycRoutingModule } from "./e-kyc-routing.module";
import { MenuBarModule } from "src/app/shared/components/menu-bar/menu-bar.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  AiGenFaceCompareService,
  AiGenIdCardService,
  EKycService,
  LoadDataKycApiService,
} from "../../shared/services/index-service";
import { UnsaveChangesGuard } from "src/app/modules/e-kyc/guards/unsaveChangesGuard.guard";
import { WebcamModule } from "ngx-webcam";
import {
  EKycPage1Component,
  EKycPage5Component,
  EKycPage3Component,
  EKycPage4Component,
  EKycPage2Component,
  EKycPage6Component,
  EKycPage7Component,
  EKycPage8Component,
  EKycPage9Component,
} from "./pages/index";
import { EKycCompletedComponent } from './pages/e-kyc-page10/e-kyc-completed.component';
import { ModifyAccountService } from "../../shared/services/modify-account.service";

@NgModule({
  declarations: [
    EKycComponent,
    EKycPage1Component,
    EKycPage2Component,
    EKycPage3Component,
    EKycPage4Component,
    EKycPage5Component,
    EKycPage6Component,
    EKycPage7Component,
    EKycPage8Component,
    EKycPage9Component,
    EKycCompletedComponent,
  ],
  imports: [
    CommonModule,
    MenuBarModule,
    FormsModule,
    ReactiveFormsModule,
    EKycRoutingModule,
    WebcamModule,
  ],
  providers: [EKycService, LoadDataKycApiService, UnsaveChangesGuard, AiGenIdCardService, AiGenFaceCompareService, ModifyAccountService],
})
export class EKycModule {}
