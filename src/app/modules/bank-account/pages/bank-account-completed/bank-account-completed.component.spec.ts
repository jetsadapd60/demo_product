import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountCompletedComponent } from './bank-account-completed.component';

describe('BankAccountCompletedComponent', () => {
  let component: BankAccountCompletedComponent;
  let fixture: ComponentFixture<BankAccountCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankAccountCompletedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankAccountCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
