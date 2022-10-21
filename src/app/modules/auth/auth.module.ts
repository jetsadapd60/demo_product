// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Module
import { NotificationModuel } from 'src/app/shared/components/notification/notification.module';

// Components
import { SelectAccountComponent } from './pages/select-account/select-account.component';
import { RegistorFormCorporateComponent } from './pages/registor-form-corporate/registor-form-corporate.component';
import { RegistorFormNormalComponent } from './pages/registor-form-personal/registor-form-personal.component';
import { OptEmailVerificationComponent } from './pages/opt-email-verification/opt-email-verification.component';
import { PinSetupComponent } from './pages/pin-setup/pin-setup.component';
import { EnterPinComponent } from './pages/enter-pin/enter-pin.component';
import { LoginComponent } from './pages/login/login.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './pages/terms-of-service/terms-of-service.component';
import { AuthComponent } from './auth.component';

// Directive
import { PhoneFormatDirective } from 'src/app/shared/directives/phone-number-format.directive';

// Services
import { SetupPinService } from '../../shared/services/setup-pin.service';
import { OtpService } from 'src/app/shared/services/otp.service';
import { AuthService } from '../../shared/services/auth.service';
import { NavigationService } from '../../shared/services/navigation.service';
import { FinishRegisterComponent } from './pages/finish-register/finish-register.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuBarModule } from 'src/app/shared/components/menu-bar/menu-bar.module';
import { CompanyTypeService } from 'src/app/shared/services/company-type.service';
import { CreateAccountComponent } from './pages/registor-form-corporate/create-account/create-account.component';
import { TransmissionDataCorporateService } from './pages/registor-form-corporate/transmission-data-corporate.service';

@NgModule({
  declarations: [
    LoginComponent,
    PrivacyPolicyComponent,
    TermsOfServiceComponent,
    AuthComponent,
    SelectAccountComponent,
    RegistorFormCorporateComponent,
    RegistorFormNormalComponent,
    OptEmailVerificationComponent,
    PhoneFormatDirective,
    PinSetupComponent,
    EnterPinComponent,
    FinishRegisterComponent,
    CreateAccountComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NotificationModuel,
    MenuBarModule
  ],
  providers: [AuthService, NavigationService, OtpService, SetupPinService, CompanyTypeService, TransmissionDataCorporateService]
})
export class AuthModule { }
