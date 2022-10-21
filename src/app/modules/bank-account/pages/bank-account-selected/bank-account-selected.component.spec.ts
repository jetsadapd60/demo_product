import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountSelectedComponent } from './bank-account-selected.component';

describe('BankAccountSelectedComponent', () => {
  let component: BankAccountSelectedComponent;
  let fixture: ComponentFixture<BankAccountSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankAccountSelectedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankAccountSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
