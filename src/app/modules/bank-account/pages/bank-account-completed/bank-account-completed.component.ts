import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModifyAccountService } from 'src/app/shared/services/modify-account.service';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { BankAccountService } from '../../../../shared/services/bank.service';

@Component({
  selector: 'app-bank-account-completed',
  templateUrl: './bank-account-completed.component.html',
  styleUrls: ['./bank-account-completed.component.scss']
})
export class BankAccountCompletedComponent implements OnInit {

  constructor(private router: Router, private modifyAccountService: ModifyAccountService, private profileService: ProfileService) { }

  ngOnInit(): void {
  }

  onCompleted() {
    this.modifyAccountService.load();
    this.profileService.getProfile();
    this.router.navigateByUrl('/');
  }

}
