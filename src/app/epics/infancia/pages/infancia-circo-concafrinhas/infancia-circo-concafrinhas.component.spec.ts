import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfanciaCircoConcafrinhasComponent } from './infancia-circo-concafrinhas.component';

describe('InfanciaCircoConcafrinhasComponent', () => {
  let component: InfanciaCircoConcafrinhasComponent;
  let fixture: ComponentFixture<InfanciaCircoConcafrinhasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfanciaCircoConcafrinhasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfanciaCircoConcafrinhasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
