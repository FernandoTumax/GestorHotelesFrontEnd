import { TestBed } from '@angular/core/testing';

import { AdminHotelGuard } from './admin-hotel.guard';

describe('AdminHotelGuard', () => {
  let guard: AdminHotelGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminHotelGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
