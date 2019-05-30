import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';

import { RaRoomsPagesComponent } from './rooms-pages.component';
import { RaAngularMaterialModule } from 'src/app/angular-material.module';

@Component({selector: 'ra-header', template: ''})
class FakeHeader {
  @Input() showBackButton: boolean;
}

@Component({selector: 'router-outlet', template: ''})
class FakeOutlet {}

describe('RaRoomsPagesComponent', () => {
  let component: RaRoomsPagesComponent;
  let fixture: ComponentFixture<RaRoomsPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaRoomsPagesComponent, FakeHeader, FakeOutlet ],
      imports: [ RaAngularMaterialModule ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaRoomsPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
