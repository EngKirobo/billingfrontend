import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Courseintake } from './courseintake';

describe('Courseintake', () => {
  let component: Courseintake;
  let fixture: ComponentFixture<Courseintake>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Courseintake],
    }).compileComponents();

    fixture = TestBed.createComponent(Courseintake);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
