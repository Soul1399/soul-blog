import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticGridComponent } from './static-grid.component';

describe('StaticGridComponent', () => {
  let component: StaticGridComponent;
  let fixture: ComponentFixture<StaticGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaticGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
