import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CecxComponent } from './cecx.component';

describe('CecxComponent', () => {
  let component: CecxComponent;
  let fixture: ComponentFixture<CecxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CecxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CecxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
