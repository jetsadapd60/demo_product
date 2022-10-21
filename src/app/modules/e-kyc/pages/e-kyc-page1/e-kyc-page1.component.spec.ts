import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EKycPage1Component } from './e-kyc-page1.component';

describe('EKycPage1Component', () => {
  let component: EKycPage1Component;
  let fixture: ComponentFixture<EKycPage1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EKycPage1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EKycPage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
