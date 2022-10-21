import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BankAccountComponent } from "./bank-account.component";
import { BankAccountRoutingModule } from "./bank-account-routing.module";
import { MenuBarModule } from "src/app/shared/components/menu-bar/menu-bar.module";
import { BankNameService } from "../../shared/services/bank-name.service";

import {
  BankAccountAgreementComponent,
  BankAccountAttachedFileComponent,
  BankAccountSelectedComponent,
} from "./pages/index-component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BankAccountCompletedComponent } from './pages/bank-account-completed/bank-account-completed.component';
import { BankAccountService } from "../../shared/services/bank.service";

@NgModule({
  declarations: [
    BankAccountComponent,
    BankAccountSelectedComponent,
    BankAccountAgreementComponent,
    BankAccountAttachedFileComponent,
    BankAccountCompletedComponent,
  ],
  imports: [CommonModule, BankAccountRoutingModule, MenuBarModule, FormsModule, ReactiveFormsModule],
  providers: [BankNameService, BankAccountService],
})
export class BankAccountModule {}
