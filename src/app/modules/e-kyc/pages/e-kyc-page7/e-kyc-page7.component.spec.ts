import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EKycPage7Component } from './e-kyc-page7.component';

describe('EKycPage7Component', () => {
  let component: EKycPage7Component;
  let fixture: ComponentFixture<EKycPage7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EKycPage7Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EKycPage7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
