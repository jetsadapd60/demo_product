import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EKycPage8Component } from './e-kyc-page8.component';

describe('EKycPage8Component', () => {
  let component: EKycPage8Component;
  let fixture: ComponentFixture<EKycPage8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EKycPage8Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EKycPage8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
