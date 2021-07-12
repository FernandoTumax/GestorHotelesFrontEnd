import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicsHotelsComponent } from './graphics-hotels.component';

describe('GraphicsHotelsComponent', () => {
  let component: GraphicsHotelsComponent;
  let fixture: ComponentFixture<GraphicsHotelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphicsHotelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicsHotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
