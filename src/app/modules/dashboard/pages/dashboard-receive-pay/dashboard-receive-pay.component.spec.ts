import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardReceivePayComponent } from './dashboard-receive-pay.component';

describe('DashboardReceivePayComponent', () => {
  let component: DashboardReceivePayComponent;
  let fixture: ComponentFixture<DashboardReceivePayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardReceivePayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardReceivePayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
