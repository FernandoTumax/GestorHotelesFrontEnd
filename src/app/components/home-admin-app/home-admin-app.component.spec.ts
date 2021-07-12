import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAdminAppComponent } from './home-admin-app.component';

describe('HomeAdminAppComponent', () => {
  let component: HomeAdminAppComponent;
  let fixture: ComponentFixture<HomeAdminAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeAdminAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAdminAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
