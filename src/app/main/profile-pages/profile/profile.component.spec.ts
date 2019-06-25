import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By, Title } from '@angular/platform-browser';
import { of } from 'rxjs';

import { RaAuthService } from '../../../auth/auth.service';
import { RaProfileComponent } from './profile.component';
import { RaHeaderTitleService } from '../../header/header-title.service';

describe('ProfileComponent', () => {
  let component: RaProfileComponent;
  let fixture: ComponentFixture<RaProfileComponent>;
  let authSpy = jasmine.createSpyObj('RaAuthService', ['']);
  let userStub = {_id: '001', name: 'username'};
  authSpy.profile$ = of(userStub);

  beforeEach(async(() => {
    const titleSpy = jasmine.createSpyObj('Title', ['setTitle']);
    const headerTitleSpy = jasmine.createSpyObj('RaHeaderTitle',
                                                ['setTitle']);
    TestBed.configureTestingModule({
      declarations: [ RaProfileComponent ],
      providers: [
        {provide: RaAuthService, useValue: authSpy},
        {provide: Title, useValue: titleSpy},
        {provide: RaHeaderTitleService, useValue: headerTitleSpy}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show a placeholder when user doesn\'t have a photo', () => {
    const photoPlaceHolder = fixture.nativeElement.querySelector('.photo-placeholder');
    expect(photoPlaceHolder).toBeTruthy();
  });

  it('should show the user\'s photo', () => {
    component.user = {
      _id: '002',
      photoURL: 'http://server.com/photo.png'
    } as any;
    fixture.detectChanges();
    const photoImg: HTMLElement = fixture.nativeElement.querySelector('.photo');
    expect(photoImg).toBeTruthy();
    expect(photoImg.getAttribute('src')).toBe(component.user.photoURL);
  });

  it('should show user\'s info', () => {
    const userStub = {
      _id: 'user001',
      name: 'username',
      displayName: 'displayname',
      email: 'user@email.com',
      role: 'auth'
    };
    component.user = userStub;
    fixture.detectChanges();
    const userInfo = fixture.nativeElement.querySelectorAll('.field-value');
    expect(userInfo.length).toBe(3);
    expect(userInfo[0].textContent).toBe(userStub.name);
    expect(userInfo[1].textContent).toBe(userStub.displayName);
    expect(userInfo[2].textContent).toBe(userStub.email);
  });

  it('should show user\'s department when it exists', () => {
    const userStub = {
      _id: 'user001',
      name: 'username',
      displayName: 'displayname',
      email: 'user@email.com',
      role: 'auth',
      department: 'UD'
    };
    component.user = userStub;
    fixture.detectChanges();
    const userInfo = fixture.nativeElement.querySelectorAll('.field-value');
    expect(userInfo.length).toBe(4);
    expect(userInfo[3].textContent).toBe(userStub.department);
  });

  it('#loading should show/hide the spinner', () => {

    expect(component.loading).toBe(false);

    let spinner: HTMLElement = fixture.nativeElement
      .querySelector('mat-spinner');
    expect(spinner).toBeFalsy();

    component.loading = true;
    fixture.detectChanges();

    spinner = fixture.nativeElement
      .querySelector('mat-spinner');
    expect(spinner).toBeTruthy();
  });

  it('#error should show/hide the error message', () => {
    expect(component.error).toBe(false);

    let errorMsg: HTMLElement = fixture.nativeElement
      .querySelector('ra-message-penal');
    expect(errorMsg).toBeFalsy();

    component.error = true;
    fixture.detectChanges();

    errorMsg = fixture.nativeElement
      .querySelector('ra-message-panel');
    expect(errorMsg).toBeTruthy();
  });

  it('should get the title of the page from the template', () => {
    fixture.detectChanges();
    const titleSpy = fixture.debugElement.injector
      .get(Title) as jasmine.SpyObj<Title>;

    const headerTitleSpy = fixture.debugElement.injector
      .get(RaHeaderTitleService) as jasmine.SpyObj<RaHeaderTitleService>;

    const pageTitle = component.pageTitle.nativeElement
      .getAttribute('pageTitle');

    expect(pageTitle).toBeTruthy();
    expect(titleSpy.setTitle).toHaveBeenCalledTimes(1);
    expect(titleSpy.setTitle).toHaveBeenCalledWith(pageTitle);
    expect(headerTitleSpy.setTitle).toHaveBeenCalledTimes(1);
    expect(headerTitleSpy.setTitle).toHaveBeenCalledWith(pageTitle);
  });

});
