import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfanciaBomSamaritanoComponent } from './infancia-bom-samaritano.component';

describe('InfanciaBomSamaritanoComponent', () => {
  let component: InfanciaBomSamaritanoComponent;
  let fixture: ComponentFixture<InfanciaBomSamaritanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfanciaBomSamaritanoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfanciaBomSamaritanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
