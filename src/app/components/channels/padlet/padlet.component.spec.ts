import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PadletComponent } from './padlet.component';

describe('PadletComponent', () => {
  let component: PadletComponent;
  let fixture: ComponentFixture<PadletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PadletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PadletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
