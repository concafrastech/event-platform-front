import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfanciaRodaAlegriaComponent } from './infancia-roda-alegria.component';

describe('InfanciaRodaAlegriaComponent', () => {
  let component: InfanciaRodaAlegriaComponent;
  let fixture: ComponentFixture<InfanciaRodaAlegriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfanciaRodaAlegriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfanciaRodaAlegriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
