import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HostelDetailComponent } from './hosteldetail'; // ✅ FIXED

describe('HostelDetailComponent', () => {

  let component: HostelDetailComponent;
  let fixture: ComponentFixture<HostelDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostelDetailComponent], // ✅ standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(HostelDetailComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
