import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Studentdashbod } from './studentdashbod';

describe('Studentdashbod', () => {
  let component: Studentdashbod;
  let fixture: ComponentFixture<Studentdashbod>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Studentdashbod],
    }).compileComponents();

    fixture = TestBed.createComponent(Studentdashbod);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
