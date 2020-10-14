import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlvplayerComponent } from './flvplayer.component';

describe('FlvplayerComponent', () => {
  let component: FlvplayerComponent;
  let fixture: ComponentFixture<FlvplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlvplayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlvplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
