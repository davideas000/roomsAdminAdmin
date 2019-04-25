import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaUserPhotoComponent } from './user-photo.component';

@Component({selector: 'mat-icon', template: ''}) class FakeMatIcon {}

describe('RaUserPhotoComponent', () => {
  let component: RaUserPhotoComponent;
  let fixture: ComponentFixture<RaUserPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaUserPhotoComponent, FakeMatIcon ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaUserPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a `<img>` tag when #photoURL is not null',
     () => {
       const fakePhotoUrl = 'http://fakeurl.com/fakephoto.png';
       component.photoURL = fakePhotoUrl;
       fixture.detectChanges();

       const imgEl: HTMLImageElement = fixture.nativeElement
         .querySelector('img');

       expect(imgEl).toBeTruthy();
       expect(imgEl.src).toBe(fakePhotoUrl);
     });

  it('should display `avatarPlaceholder` when #photoURL is null' ,

     () => {
       const placeholderEl: HTMLElement = fixture.nativeElement
         .querySelector('mat-icon')
       expect(placeholderEl).toBeTruthy();
     });

  it('should use the default values for the height, width and '
     + '`font-size` when `@Input() size` is not provided', () => {
       const fakePhotoUrl = 'http://fakeurl.com/fakephoto.png';
       component.photoURL = fakePhotoUrl;
       fixture.detectChanges();

       const imgEl: HTMLImageElement = fixture.nativeElement
         .querySelector('img');
       expect(imgEl.style.width).toBe('50px');
       expect(imgEl.style.height).toBe('50px');
       expect(imgEl.style.fontSize).toBe('50px');
       expect(imgEl.style.borderRadius).toBe('50%');
     });

  it('#size should define the height, width and font size', () => {
    component.size = 100;
    fixture.detectChanges();

    const placeholderEl: HTMLElement =  fixture.nativeElement
      .querySelector('mat-icon');

    expect(placeholderEl.style.width).toBe('100px');
    expect(placeholderEl.style.height).toBe('100px');
    expect(placeholderEl.style.fontSize).toBe('100px');
    expect(placeholderEl.style.borderRadius).toBe('50%');
  });
});
