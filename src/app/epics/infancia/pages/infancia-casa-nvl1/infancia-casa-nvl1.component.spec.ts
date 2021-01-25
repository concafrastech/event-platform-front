import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfanciaCasaNvl1Component } from './infancia-casa-nvl1.component';

describe('InfanciaCasaNvl1Component', () => {
  let component: InfanciaCasaNvl1Component;
  let fixture: ComponentFixture<InfanciaCasaNvl1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfanciaCasaNvl1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfanciaCasaNvl1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
