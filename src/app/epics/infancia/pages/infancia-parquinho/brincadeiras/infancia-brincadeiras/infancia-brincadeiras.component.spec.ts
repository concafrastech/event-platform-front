import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfanciaBrincadeirasComponent } from './infancia-brincadeiras.component';

describe('InfanciaBrincadeirasComponent', () => {
  let component: InfanciaBrincadeirasComponent;
  let fixture: ComponentFixture<InfanciaBrincadeirasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfanciaBrincadeirasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfanciaBrincadeirasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
