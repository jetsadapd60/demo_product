import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EKycPage6Component } from './e-kyc-page6.component';

describe('EKycPage6Component', () => {
  let component: EKycPage6Component;
  let fixture: ComponentFixture<EKycPage6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EKycPage6Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EKycPage6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
