import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ilha1Component } from './ilha1.component';

describe('Ilha1Component', () => {
  let component: Ilha1Component;
  let fixture: ComponentFixture<Ilha1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ilha1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Ilha1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
