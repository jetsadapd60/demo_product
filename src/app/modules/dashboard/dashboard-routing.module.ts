import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { DashboardAssetComponent, DashboardBuySaleComponent, DashboardHomeComponent, DashboardReceivePayComponent, HelpSupportComponent } from './pages/index-page';


const routes: Routes = [
    { path: '', component: DashboardComponent,
        children: [
            { path: '', component:  DashboardHomeComponent },
            { path: 'buy-sale', component:  DashboardBuySaleComponent },
            { path: 'asset', component: DashboardAssetComponent },
            { path: 'receive-pay', component: DashboardReceivePayComponent },
            { path: 'contact', component: ContactComponent },
            { path: 'help-support', component: HelpSupportComponent },
        ]
    }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingMoudule {}