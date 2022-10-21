import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistorFormCorporateComponent } from './registor-form-corporate.component';

describe('RegistorFormEntityComponent', () => {
  let component: RegistorFormCorporateComponent;
  let fixture: ComponentFixture<RegistorFormCorporateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistorFormCorporateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistorFormCorporateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
