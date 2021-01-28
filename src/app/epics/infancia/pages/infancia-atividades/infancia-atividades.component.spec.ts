import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfanciaAtividadesComponent } from './infancia-atividades.component';

describe('InfanciaAtividadesComponent', () => {
  let component: InfanciaAtividadesComponent;
  let fixture: ComponentFixture<InfanciaAtividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfanciaAtividadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfanciaAtividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
