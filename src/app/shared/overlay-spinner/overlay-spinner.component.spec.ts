import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaOverlaySpinnerComponent } from './overlay-spinner.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RaOverlaySpinnerComponent', () => {
  let component: RaOverlaySpinnerComponent;
  let fixture: ComponentFixture<RaOverlaySpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaOverlaySpinnerComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaOverlaySpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
