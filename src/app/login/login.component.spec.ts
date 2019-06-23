import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';

import { RaLoginComponent } from './login.component';

import { RaAngularMaterialModule } from '../angular-material.module';
import { RaAuthService } from '../auth/auth.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'ra-login-error-message',
  template: ''
})
class FakeLoginErrorMsgComp {
  @Input() errorCode;
}

@Component({
  selector: 'ra-login-form',
  template: ''
})
class FakeLoginFormComp {}

@Component({selector: 'ra-overlay-spinner', template: ''})
class FakeOverlaySpinnerComp {}

describe('RaLoginComponent', () => {
  let component: RaLoginComponent;
  let fixture: ComponentFixture<RaLoginComponent>;

  beforeEach(async(() => {
    const authSpy = jasmine.createSpyObj('RaAuthService', ['login']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate'])
    TestBed.configureTestingModule({
      declarations: [ RaLoginComponent, FakeLoginErrorMsgComp,
                      FakeLoginFormComp, FakeOverlaySpinnerComp ],
      imports: [ RaAngularMaterialModule,
                 NoopAnimationsModule ],
      providers: [
        { provide: RaAuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpy }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the spinner when #loading is true', () => {
    let getSpinner = () => {
      return fixture.nativeElement.querySelector('ra-overlay-spinner');
    };

    // check initial values (initially #loading should be false)
    let overlayEl = getSpinner();
    expect(component.loading).toBe(false);
    expect(overlayEl).toBeFalsy();

    component.loading = true;

    fixture.detectChanges();

    // check values when #loading is true
    overlayEl = getSpinner();
    expect(component.loading).toBe(true);
    expect(overlayEl).toBeTruthy();
  });

  it('should display an error message when #error is true', () => {
    let getErrorMsg = () => fixture.nativeElement.querySelector('ra-login-error-message');

    // check initial values
    let errorMsgEl = getErrorMsg();
    expect(component.error).toBe(false);
    expect(errorMsgEl).toBeFalsy();

    component.error =  true;
    fixture.detectChanges();

    // #error = true
    errorMsgEl = getErrorMsg();
    expect(component.error).toBe(true);
    expect(errorMsgEl).toBeTruthy();
  });

  it('should set #error to false when `ra-login-error-message` '
     + 'raises a `closeMessage` event', () => {
       component.error = true;
       component.errorCode = 'password-wrong';
       fixture.detectChanges();

       const errorMsgEl: HTMLElement = fixture.nativeElement
         .querySelector('ra-login-error-message');

       const ev = new Event('closeMessage');
       errorMsgEl.dispatchEvent(ev);

       expect(component.error).toBe(false);
       expect(component.errorCode).toBeFalsy();
     });

  it('should log in the user when `ra-login-form` raises a '
     + '`loginSubmit` event', () => {

       const authSpy = fixture.debugElement.injector
         .get(RaAuthService) as jasmine.SpyObj<RaAuthService>;
       authSpy.login.and.returnValue(of(true));

       const formDe = fixture.debugElement
         .query(By.css('ra-login-form'));

       const fakeData = {
         email: 'fake@email.com', password: 'fakepassword'
       };
       formDe.triggerEventHandler('loginSubmit', fakeData);

       expect(authSpy.login).toHaveBeenCalledTimes(1);
       expect(authSpy.login).toHaveBeenCalledWith(
         fakeData.email, fakeData.password
       );
       expect(component.loading).toBe(false);
       expect(component.errorCode).toBeFalsy();

       const routerSpy = fixture.debugElement.injector
         .get(Router) as jasmine.SpyObj<Router>;
       // should redirect the user to the main page
       expect(routerSpy.navigate).toHaveBeenCalledTimes(1);
       expect(routerSpy.navigate).toHaveBeenCalledWith(['/main']);
     });

  it('should display an error message when login fails', () => {
    const authSpy = fixture.debugElement.injector
      .get(RaAuthService) as jasmine.SpyObj<RaAuthService>;
    const errorMsgStub = {error: {message: 'error.message'}};
    authSpy.login.and.returnValue(throwError(
      errorMsgStub
    ));

    const formDe = fixture.debugElement
      .query(By.css('ra-login-form'));

    const fakeData = {
      email: 'fake@email.com', password: 'fakepassword'
    };
    formDe.triggerEventHandler('loginSubmit', fakeData);

    fixture.detectChanges();

    expect(authSpy.login).toHaveBeenCalledTimes(1);
    expect(authSpy.login).toHaveBeenCalledWith(
      fakeData.email, fakeData.password
    );
    expect(component.loading).toBe(false);
    expect(component.error).toBe(true);
    expect(component.errorCode).toBe(errorMsgStub.error.message);

    const errorMsgEl = fixture.nativeElement
      .querySelector('ra-login-error-message');
    expect(errorMsgEl).toBeTruthy();
  });

});
