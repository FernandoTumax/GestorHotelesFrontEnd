import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReservationAdminComponent } from './list-reservation-admin.component';

describe('ListReservationAdminComponent', () => {
  let component: ListReservationAdminComponent;
  let fixture: ComponentFixture<ListReservationAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReservationAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReservationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
