import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfanciaInicioComponent } from './infancia-inicio.component';

describe('InfanciaInicioComponent', () => {
  let component: InfanciaInicioComponent;
  let fixture: ComponentFixture<InfanciaInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfanciaInicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfanciaInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
