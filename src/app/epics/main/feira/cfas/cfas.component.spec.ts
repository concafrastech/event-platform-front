import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfasComponent } from './cfas.component';

describe('CfasComponent', () => {
  let component: CfasComponent;
  let fixture: ComponentFixture<CfasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CfasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
