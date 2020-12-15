import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarjovemComponent } from './sidebarjovem.component';

describe('SidebarjovemComponent', () => {
  let component: SidebarjovemComponent;
  let fixture: ComponentFixture<SidebarjovemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarjovemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarjovemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
