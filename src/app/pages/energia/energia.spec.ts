import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Energia } from './energia';

describe('Energia', () => {
  let component: Energia;
  let fixture: ComponentFixture<Energia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Energia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Energia);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
