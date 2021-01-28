import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JogosDigitaisComponent } from './jogos-digitais.component';

describe('JogosDigitaisComponent', () => {
  let component: JogosDigitaisComponent;
  let fixture: ComponentFixture<JogosDigitaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JogosDigitaisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JogosDigitaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
