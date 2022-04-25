import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrbanServicesComponent } from './vacancies-register.component';

describe('UrbanServicesComponent', () => {
  let component: UrbanServicesComponent;
  let fixture: ComponentFixture<UrbanServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrbanServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UrbanServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
