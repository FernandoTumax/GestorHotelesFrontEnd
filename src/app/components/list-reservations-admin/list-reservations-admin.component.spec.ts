import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReservationsAdminComponent } from './list-reservations-admin.component';

describe('ListReservationsAdminComponent', () => {
  let component: ListReservationsAdminComponent;
  let fixture: ComponentFixture<ListReservationsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReservationsAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReservationsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
