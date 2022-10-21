import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBuySaleComponent } from './dashboard-buy-sale.component';

describe('DashboardBuySaleComponent', () => {
  let component: DashboardBuySaleComponent;
  let fixture: ComponentFixture<DashboardBuySaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardBuySaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardBuySaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
