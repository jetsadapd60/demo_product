import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistorFormNormalComponent } from './registor-form-personal.component';

describe('RegistorFormNormalComponent', () => {
  let component: RegistorFormNormalComponent;
  let fixture: ComponentFixture<RegistorFormNormalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistorFormNormalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistorFormNormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
