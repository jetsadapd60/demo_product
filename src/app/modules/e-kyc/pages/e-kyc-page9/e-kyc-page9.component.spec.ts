import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EKycPage9Component } from './e-kyc-page9.component';

describe('EKycPage9Component', () => {
  let component: EKycPage9Component;
  let fixture: ComponentFixture<EKycPage9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EKycPage9Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EKycPage9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
