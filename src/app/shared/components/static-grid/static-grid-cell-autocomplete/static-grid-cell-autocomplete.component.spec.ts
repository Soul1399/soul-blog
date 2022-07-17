import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticGridCellAutocompleteComponent } from './static-grid-cell-autocomplete.component';

describe('StaticGridCellAutocompleteComponent', () => {
  let component: StaticGridCellAutocompleteComponent;
  let fixture: ComponentFixture<StaticGridCellAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaticGridCellAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticGridCellAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
