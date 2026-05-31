import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Kozstudent } from './kozstudent';

describe('Kozstudent', () => {
  let component: Kozstudent;
  let fixture: ComponentFixture<Kozstudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Kozstudent],
    }).compileComponents();

    fixture = TestBed.createComponent(Kozstudent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
