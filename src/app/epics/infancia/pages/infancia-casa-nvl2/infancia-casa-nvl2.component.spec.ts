import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfanciaCasaNvl2Component } from './infancia-casa-nvl2.component';

describe('InfanciaCasaNvl2Component', () => {
  let component: InfanciaCasaNvl2Component;
  let fixture: ComponentFixture<InfanciaCasaNvl2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfanciaCasaNvl2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfanciaCasaNvl2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
