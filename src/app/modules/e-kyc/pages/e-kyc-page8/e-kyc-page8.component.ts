import { Component, OnInit } from '@angular/core';
import { EKycService } from 'src/app/shared/services/index-service';


@Component({
  selector: 'app-personal-scan-face',
  templateUrl: 'e-kyc-page8.component.html',
  styleUrls: ['e-kyc-page8.component.scss']
})
export class EKycPage8Component implements OnInit {

  constructor(private ekycService: EKycService) { }

  ngOnInit(): void {
  }

}
