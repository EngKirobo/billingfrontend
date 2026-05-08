import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Assignrooms } from './assignrooms';

describe('Assignrooms', () => {
  let component: Assignrooms;
  let fixture: ComponentFixture<Assignrooms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Assignrooms],
    }).compileComponents();

    fixture = TestBed.createComponent(Assignrooms);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
