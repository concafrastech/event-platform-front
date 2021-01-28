import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JardimComponent } from './jardim.component';

describe('JardimComponent', () => {
  let component: JardimComponent;
  let fixture: ComponentFixture<JardimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JardimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JardimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
