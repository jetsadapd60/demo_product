import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EKycPage2Component } from './e-kyc-page2.component';

describe('EKycPage2Component', () => {
  let component: EKycPage2Component;
  let fixture: ComponentFixture<EKycPage2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EKycPage2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EKycPage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
