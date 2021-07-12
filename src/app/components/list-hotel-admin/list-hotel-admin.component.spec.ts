import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHotelAdminComponent } from './list-hotel-admin.component';

describe('ListHotelAdminComponent', () => {
  let component: ListHotelAdminComponent;
  let fixture: ComponentFixture<ListHotelAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListHotelAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHotelAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
