import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfanciaGamesComponent } from './infancia-games.component';

describe('InfanciaGamesComponent', () => {
  let component: InfanciaGamesComponent;
  let fixture: ComponentFixture<InfanciaGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfanciaGamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfanciaGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
