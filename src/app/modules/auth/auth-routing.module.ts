import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { EnterPinComponent } from './pages/enter-pin/enter-pin.component';
import { LoginComponent } from './pages/login/login.component';
import { OptEmailVerificationComponent } from './pages/opt-email-verification/opt-email-verification.component';
import { PinSetupComponent } from './pages/pin-setup/pin-setup.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { RegistorFormCorporateComponent } from './pages/registor-form-corporate/registor-form-corporate.component';
import { RegistorFormNormalComponent } from './pages/registor-form-personal/registor-form-personal.component';
import { SelectAccountComponent } from './pages/select-account/select-account.component';
import { TermsOfServiceComponent } from './pages/terms-of-service/terms-of-service.component';
import { FinishRegisterComponent } from './pages/finish-register/finish-register.component';
import { CreateAccountComponent } from './pages/registor-form-corporate/create-account/create-account.component';


const routes: Routes = [
  {
    path: '', component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'privacy-policy', component: PrivacyPolicyComponent },
      { path: 'terms-service', component: TermsOfServiceComponent },
      { path: 'select-account', component: SelectAccountComponent },
      { path: 'registor-corporate', component: RegistorFormCorporateComponent },
      { path: 'create-account-corporate', component: CreateAccountComponent },
      { path: 'registor-personal', component: RegistorFormNormalComponent },
      { path: 'opt-sms-verification', component: OptEmailVerificationComponent, data: {otpType: 'SMS'} },
      { path: 'opt-sms-only-verification', component: OptEmailVerificationComponent, data: {otpType: 'SMS-ONLY'} },
      { path: 'opt-email-verification', component: OptEmailVerificationComponent, data: {otpType: 'EMAIL'} },
      { path: 'pin-setup', component: PinSetupComponent },
      { path: 'enter-pin', component: EnterPinComponent },
      { path: 'finish', component: FinishRegisterComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
