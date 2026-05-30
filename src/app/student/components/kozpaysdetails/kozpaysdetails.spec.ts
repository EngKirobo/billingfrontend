import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Kozpaysdetails } from './kozpaysdetails';

describe('Kozpaysdetails', () => {
  let component: Kozpaysdetails;
  let fixture: ComponentFixture<Kozpaysdetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Kozpaysdetails],
    }).compileComponents();

    fixture = TestBed.createComponent(Kozpaysdetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
