import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesenhosImprimirComponent } from './desenhos-imprimir.component';

describe('DesenhosImprimirComponent', () => {
  let component: DesenhosImprimirComponent;
  let fixture: ComponentFixture<DesenhosImprimirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesenhosImprimirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesenhosImprimirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
