import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaImageSlideshowComponent } from './image-slideshow.component';
import { Component } from '@angular/core';

@Component({selector: 'mat-icon', template: ''})
class FakeMatIconComponent {}

@Component({selector: 'ra-image-placeholder', template: ''})
class FakeImagePlaceholderComponent {}

describe('RaImageSlideshowComponent', () => {
  let component: RaImageSlideshowComponent;
  let fixture: ComponentFixture<RaImageSlideshowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RaImageSlideshowComponent,
        FakeMatIconComponent,
        FakeImagePlaceholderComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaImageSlideshowComponent);
    component = fixture.componentInstance;
    component.images = ['#photourl1', '#photourl2', '#photourl3'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
