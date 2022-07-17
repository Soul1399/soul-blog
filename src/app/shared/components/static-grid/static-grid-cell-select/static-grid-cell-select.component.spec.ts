import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticGridCellSelectComponent } from './static-grid-cell-select.component';

describe('StaticGridCellSelectComponent', () => {
  let component: StaticGridCellSelectComponent;
  let fixture: ComponentFixture<StaticGridCellSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaticGridCellSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticGridCellSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
