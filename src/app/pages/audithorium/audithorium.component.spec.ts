import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudithoriumComponent } from './audithorium.component';

describe('AudithoriumComponent', () => {
  let component: AudithoriumComponent;
  let fixture: ComponentFixture<AudithoriumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudithoriumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudithoriumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
