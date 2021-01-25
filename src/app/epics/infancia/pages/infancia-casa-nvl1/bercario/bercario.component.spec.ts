import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BercarioComponent } from './bercario.component';

describe('BercarioComponent', () => {
  let component: BercarioComponent;
  let fixture: ComponentFixture<BercarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BercarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BercarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
