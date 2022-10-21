import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NotificationComponent } from "./notification.component";
import { NotificationService } from "./notification.service";


@NgModule({
    declarations: [NotificationComponent],
    imports: [CommonModule],
    exports: [NotificationComponent],
    providers: [NotificationService]
})
export class NotificationModuel {}