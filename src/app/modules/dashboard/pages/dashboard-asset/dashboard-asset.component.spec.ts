import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAssetComponent } from './dashboard-asset.component';

describe('DashboardAssetComponent', () => {
  let component: DashboardAssetComponent;
  let fixture: ComponentFixture<DashboardAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardAssetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
