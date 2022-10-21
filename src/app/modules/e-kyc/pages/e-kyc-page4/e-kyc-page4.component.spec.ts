import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EKycPage4Component } from './e-kyc-page4.component';

describe('EKycPage4Component', () => {
  let component: EKycPage4Component;
  let fixture: ComponentFixture<EKycPage4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EKycPage4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EKycPage4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
