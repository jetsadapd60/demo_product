import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  // go to verification
  { path: 'bank-account', loadChildren: () => import('./modules/bank-account/bank-account.module').then(m=>m.BankAccountModule) },
  // go to verification
  { path: 'e-kyc', loadChildren: () => import('./modules/e-kyc/e-kyc.module').then(m=>m.EKycModule) },
  // go to auth
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m=>m.AuthModule) },
  // go to dashboard
  { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m=>m.DashboardModule), canActivate: [AuthGuard] },
  // redirec to dashboard
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // show page not found
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
