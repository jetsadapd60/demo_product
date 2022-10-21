import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountAttachedFileComponent } from './bank-account-attached-file.component';

describe('BankAccountAttachedFileComponent', () => {
  let component: BankAccountAttachedFileComponent;
  let fixture: ComponentFixture<BankAccountAttachedFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankAccountAttachedFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankAccountAttachedFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
