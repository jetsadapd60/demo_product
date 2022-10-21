import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {
  EKycPage1Component,
  EKycPage2Component,
  EKycPage3Component,
  EKycPage4Component,
  EKycPage5Component,
  EKycPage6Component,
  EKycPage7Component,
  EKycPage8Component,
  EKycPage9Component,
} from "./pages/index";
import { EKycComponent } from "./e-kyc.component";
import { EKycCompletedComponent } from "./pages/e-kyc-page10/e-kyc-completed.component";

const routes: Routes = [
  {
    path: "",
    component: EKycComponent,
    children: [
      { path: "KycPage1", component: EKycPage1Component },
      { path: "KycPage2", component: EKycPage2Component },
      { path: "KycPage3", component: EKycPage3Component, data: { ekycError: false } },
      { path: "KycPage3-error", component: EKycPage3Component, data: { ekycError: true } },
      { path: "KycPage4", component: EKycPage4Component },
      { path: "KycPage5", component: EKycPage5Component },
      { path: "KycPage6", component: EKycPage6Component },
      { path: "KycPage7", component: EKycPage7Component },
      { path: "KycPage8", component: EKycPage8Component },
      { path: "KycPage9", component: EKycPage9Component },
      { path: "KycPage10", component: EKycCompletedComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class EKycRoutingModule {}
