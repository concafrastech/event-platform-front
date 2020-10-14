import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggablemodalComponent } from './draggablemodal.component';

describe('DraggablemodalComponent', () => {
  let component: DraggablemodalComponent;
  let fixture: ComponentFixture<DraggablemodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraggablemodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DraggablemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
