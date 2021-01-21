import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfanciaCantinhoHistoriaComponent } from './infancia-cantinho-historia.component';

describe('InfanciaCantinhoHistoriaComponent', () => {
  let component: InfanciaCantinhoHistoriaComponent;
  let fixture: ComponentFixture<InfanciaCantinhoHistoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfanciaCantinhoHistoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfanciaCantinhoHistoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
