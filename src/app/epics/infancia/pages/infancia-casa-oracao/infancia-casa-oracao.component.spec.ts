import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfanciaCasaOracaoComponent } from './infancia-casa-oracao.component';

describe('InfanciaCasaOracaoComponent', () => {
  let component: InfanciaCasaOracaoComponent;
  let fixture: ComponentFixture<InfanciaCasaOracaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfanciaCasaOracaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfanciaCasaOracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
