import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelDashboard } from './hostel-dashboard';

describe('HostelDashboard', () => {
  let component: HostelDashboard;
  let fixture: ComponentFixture<HostelDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostelDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(HostelDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
