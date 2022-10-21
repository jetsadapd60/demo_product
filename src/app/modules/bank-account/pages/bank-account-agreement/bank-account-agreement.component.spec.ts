import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountAgreementComponent } from './bank-account-agreement.component';

describe('BankAccountAgreementComponent', () => {
  let component: BankAccountAgreementComponent;
  let fixture: ComponentFixture<BankAccountAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankAccountAgreementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankAccountAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
