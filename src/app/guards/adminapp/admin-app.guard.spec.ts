import { TestBed } from '@angular/core/testing';

import { AdminAppGuard } from './admin-app.guard';

describe('AdminAppGuard', () => {
  let guard: AdminAppGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminAppGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
