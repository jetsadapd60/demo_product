import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EKycComponent } from './e-kyc.component';

describe('VerificationComponent', () => {
  let component: EKycComponent;
  let fixture: ComponentFixture<EKycComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EKycComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
