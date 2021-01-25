import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfanciaParquinhoComponent } from './infancia-parquinho.component';

describe('InfanciaParquinhoComponent', () => {
  let component: InfanciaParquinhoComponent;
  let fixture: ComponentFixture<InfanciaParquinhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfanciaParquinhoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfanciaParquinhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
