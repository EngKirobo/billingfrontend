import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Controlnumber } from './controlnumber';

describe('Controlnumber', () => {
  let component: Controlnumber;
  let fixture: ComponentFixture<Controlnumber>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Controlnumber],
    }).compileComponents();

    fixture = TestBed.createComponent(Controlnumber);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
