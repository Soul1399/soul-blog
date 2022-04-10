import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerSideNavComponent } from './banner-side-nav.component';

describe('BannerSideNavComponent', () => {
  let component: BannerSideNavComponent;
  let fixture: ComponentFixture<BannerSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerSideNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
