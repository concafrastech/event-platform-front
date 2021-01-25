import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborterapiasComponent } from './laborterapias.component';

describe('LaborterapiasComponent', () => {
  let component: LaborterapiasComponent;
  let fixture: ComponentFixture<LaborterapiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaborterapiasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaborterapiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
