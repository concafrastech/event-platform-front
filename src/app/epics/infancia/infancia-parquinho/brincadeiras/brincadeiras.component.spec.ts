import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrincadeirasComponent } from './brincadeiras.component';

describe('BrincadeirasComponent', () => {
  let component: BrincadeirasComponent;
  let fixture: ComponentFixture<BrincadeirasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrincadeirasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrincadeirasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
