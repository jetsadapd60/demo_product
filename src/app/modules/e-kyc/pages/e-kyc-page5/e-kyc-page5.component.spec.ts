import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EKycPage5Component } from './e-kyc-page5.component';

describe('EKycPage5Component', () => {
  let component: EKycPage5Component;
  let fixture: ComponentFixture<EKycPage5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EKycPage5Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EKycPage5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
