import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubeDoLivroComponent } from './clube-do-livro.component';

describe('ClubeDoLivroComponent', () => {
  let component: ClubeDoLivroComponent;
  let fixture: ComponentFixture<ClubeDoLivroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubeDoLivroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubeDoLivroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
