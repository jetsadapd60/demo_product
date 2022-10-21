import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptEmailVerificationComponent } from './opt-email-verification.component';

describe('OptEmailVerificationComponent', () => {
  let component: OptEmailVerificationComponent;
  let fixture: ComponentFixture<OptEmailVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptEmailVerificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptEmailVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
