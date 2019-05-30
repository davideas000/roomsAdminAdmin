import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { RaMainComponent } from './main.component';

@Component({selector: 'router-outlet', template: ''})
class FakeOutlet {}

describe('RaMainComponent', () => {
  let component: RaMainComponent;
  let fixture: ComponentFixture<RaMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaMainComponent, FakeOutlet ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
