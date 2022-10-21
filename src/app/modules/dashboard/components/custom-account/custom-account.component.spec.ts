import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAccountComponent } from './custom-account.component';

describe('CustomAccountComponent', () => {
  let component: CustomAccountComponent;
  let fixture: ComponentFixture<CustomAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
