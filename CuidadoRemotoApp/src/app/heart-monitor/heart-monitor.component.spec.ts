import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartMonitorComponent } from './heart-monitor.component';

describe('HeartMonitorComponent', () => {
  let component: HeartMonitorComponent;
  let fixture: ComponentFixture<HeartMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeartMonitorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeartMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
