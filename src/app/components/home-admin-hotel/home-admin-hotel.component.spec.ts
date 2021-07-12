import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAdminHotelComponent } from './home-admin-hotel.component';

describe('HomeAdminHotelComponent', () => {
  let component: HomeAdminHotelComponent;
  let fixture: ComponentFixture<HomeAdminHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeAdminHotelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAdminHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
