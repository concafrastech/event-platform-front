import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipsnackComponent } from './flipsnack.component';

describe('FlipsnackComponent', () => {
  let component: FlipsnackComponent;
  let fixture: ComponentFixture<FlipsnackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlipsnackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlipsnackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
