import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BankNameService } from "src/app/shared/services/bank-name.service";
import { ModifyAccountService } from "../../../../shared/services/modify-account.service";
import { CustomAccountComponent } from "./custom-account.component";
import { ToggleAccountService } from "./toggle-account.service";

@NgModule({
    declarations: [CustomAccountComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [CustomAccountComponent],
    providers: [ToggleAccountService, ModifyAccountService, BankNameService]
})
export class CustomAccountModule {}