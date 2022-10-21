import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BankAccountComponent } from "./bank-account.component";
import { BankAccountCompletedComponent } from "./pages/bank-account-completed/bank-account-completed.component";

import {
  BankAccountAgreementComponent,
  BankAccountAttachedFileComponent,
  BankAccountSelectedComponent,
} from "./pages/index-component";

const routes: Routes = [
  {
    path: "",
    component: BankAccountComponent,
    children: [
      { path: "KycPage11", component: BankAccountSelectedComponent },
      { path: "KycPage12", component: BankAccountAgreementComponent },
      { path: "KycPage13", component: BankAccountAttachedFileComponent },
      { path: "KycPage14", component: BankAccountCompletedComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BankAccountRoutingModule {}
