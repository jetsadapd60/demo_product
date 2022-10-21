import { Component, OnInit } from "@angular/core";
import { AuthService, ProfileService } from "../../../../shared/services/index-service";
import { ToggleAccountService } from "../custom-account/toggle-account.service";

@Component({
  selector: "app-dashboard-top",
  templateUrl: "./dashboard-top.component.html",
  styleUrls: ["./dashboard-top.component.scss"],
})
export class DashboardTopComponent implements OnInit {
  isToggleSettingMenu = false;
  fullName = "";
  imageProfile = "";
  idProfile = "";
  isVerify = false;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    public toggleAccount: ToggleAccountService
  ) {}

  ngOnInit(): void {
    this.profileService.profile$.subscribe((res) => {
      this.fullName = res.fullName;
      this.imageProfile = `http://203.150.199.17/AusirisBackendApi/${res.profileImage}`;
    });
  }

  closeToggleSettingMenu() {
    this.isToggleSettingMenu = !this.isToggleSettingMenu;
  }

  logout() {
    this.authService.loggedOut();
    this.closeToggleSettingMenu();
  }
}
