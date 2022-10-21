import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EKycCompletedComponent } from './e-kyc-completed.component';

describe('EKycCompletedComponent', () => {
  let component: EKycCompletedComponent;
  let fixture: ComponentFixture<EKycCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EKycCompletedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EKycCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
