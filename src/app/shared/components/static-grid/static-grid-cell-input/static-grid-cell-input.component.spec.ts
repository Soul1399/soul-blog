import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticGridCellInputComponent } from './static-grid-cell-input.component';

describe('StaticGridCellInputComponent', () => {
  let component: StaticGridCellInputComponent;
  let fixture: ComponentFixture<StaticGridCellInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaticGridCellInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticGridCellInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
