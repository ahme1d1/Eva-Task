import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryCitiesComponent } from './country-cities.component';

describe('CountryCitiesComponent', () => {
  let component: CountryCitiesComponent;
  let fixture: ComponentFixture<CountryCitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryCitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
