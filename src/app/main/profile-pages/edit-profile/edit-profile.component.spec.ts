import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, Title } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { RaEditProfileComponent } from './edit-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { RaAuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { RaHeaderTitleService } from '../../header/header-title.service';

@Component({selector: 'ra-alert', template: ''})
export class FakeAlertComponent {}

describe('EditProfileComponent', () => {
  let component: RaEditProfileComponent;
  let fixture: ComponentFixture<RaEditProfileComponent>;
  const userStub = {
    _id: 'user',
    name: 'username',
    displayName: 'displayname',
    email: 'user@email'
  };

  beforeEach(async(() => {
    const authSpy = jasmine.createSpyObj('RaAuthService',
                                         ['updateProfile']);
    authSpy.profile$ = of(userStub);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const snackSpy = jasmine.createSpyObj('MatSnackBar',
                                          ['openFromComponent']);
    const titleSpy = jasmine.createSpyObj('Title', ['setTitle']);
    const headerTitleSpy = jasmine.createSpyObj('RaHeaderTitle',
                                                ['setTitle']);
    TestBed.configureTestingModule({
      declarations: [ RaEditProfileComponent, FakeAlertComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        {provide: RaAuthService, useValue: authSpy},
        {provide: Router, useValue: routerSpy},
        {provide: MatSnackBar, useValue: snackSpy},
        {provide: Title, useValue: titleSpy},
        {provide: RaHeaderTitleService, useValue: headerTitleSpy}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set form\'s value to the user\'s profile values',
     () => {
       expect(component.name.value).toBe(userStub.name);
       expect(component.displayName.value).toBe(userStub.displayName);
       expect(component.email.value).toBe(userStub.email);
     });

  it('should show error messages when form values are invalid',
     () => {
       component.name.setValue('');
       component.displayName.setValue('');
       component.email.setValue('kfjçasdj');
       fixture.detectChanges();
       let errorsEl = fixture.nativeElement
         .querySelectorAll('mat-error');
       expect(errorsEl[0].textContent)
         .toBe('Campo obrigatório'); // name required
       expect(errorsEl[1].textContent)
         .toBe('Campo obrigatório'); // displayName required
       expect(errorsEl[2].textContent)
         .toBe('Email invalido');    // email ivalid

       component.email.setValue('');
       fixture.detectChanges();
       errorsEl = fixture.nativeElement.querySelectorAll('mat-error');
       expect(errorsEl[2].textContent)
         .toBe('Campo obrigatório');    // email required
     });

  it('should show an error message when `email` and `emailConfirmation` '
     + 'mismatch', () => {
       component.email.setValue('some@valid.email');
       component.emailConfirmation.setValue('some@email.com');
       fixture.detectChanges();
       // email and emailConfirmation mismatch
       const errorEl = fixture.nativeElement
         .querySelector('.field:last-of-type mat-error');
       expect(errorEl).toBeTruthy();
       expect(errorEl.textContent).toBeTruthy();
     })

  it('cancel button, should navigate to the user\'s profile page',
     () => {
       const cancelBtnDe = fixture.debugElement
         .query(By.css('button[type=button]'));
       cancelBtnDe.triggerEventHandler('click', null);
       const routerSpy = fixture.debugElement.injector.get(Router);
       expect(routerSpy.navigate).toHaveBeenCalledTimes(1);
       expect(routerSpy.navigate)
         .toHaveBeenCalledWith(['/main/profile/show']);
     });

  it('should update user\'s profile on form submit', () => {
    const authSpy = fixture.debugElement.injector
      .get(RaAuthService) as jasmine.SpyObj<RaAuthService>;
    const updatedProfileStub = {
      name: 'updatedvalue',
      displayName: 'newdisplayname',
      email: 'useremail@email.com',
      emailConfirmation: 'useremail@email.com'
    };

    component.profileForm.setValue(updatedProfileStub);
    authSpy.updateProfile.and.returnValue(of(updatedProfileStub));
    const snackSpy = fixture.debugElement.injector.get(MatSnackBar);
    const routerSpy = fixture.debugElement.injector.get(Router);

    const formDe = fixture.debugElement.query(By.css('form'));
    formDe.triggerEventHandler('ngSubmit', null); // form submit

    expect(authSpy.updateProfile).toHaveBeenCalledTimes(1);
    expect(authSpy.updateProfile)
      .toHaveBeenCalledWith(updatedProfileStub);
    expect(snackSpy.openFromComponent).toHaveBeenCalledTimes(1);
    expect(snackSpy.openFromComponent).toHaveBeenCalledWith(
      jasmine.anything(), {duration: 1000});
    expect(routerSpy.navigate).toHaveBeenCalledTimes(1);
    expect(routerSpy.navigate)
      .toHaveBeenCalledWith(['/main/profile/show']);
    expect(component.processing).toBe(false);
  });

  it('should show an alert when the update of the user\'s profile fails',
     () => {
       const authSpy = fixture.debugElement.injector
         .get(RaAuthService) as jasmine.SpyObj<RaAuthService>;
       authSpy.updateProfile.and.returnValue(
         throwError({error: {message: 'duplicate-email'}}))

       component.update();
       fixture.detectChanges();

       const alertEl = fixture.nativeElement
         .querySelector('ra-message-panel');
       expect(component.duplicateEmailError).toBe(true);
       expect(alertEl).toBeTruthy();
     });

  it('should hide `<ra-message-panel>` on close event of the alert',
     () => {
       component.duplicateEmailError = true;
       fixture.detectChanges();
       const alertDe = fixture.debugElement
         .query(By.css('ra-message-panel'));
       alertDe.triggerEventHandler('close', null);
       fixture.detectChanges();
       const alertEl = fixture.nativeElement
         .querySelector('ra-message-penal');

       expect(component.duplicateEmailError).toBe(false);
       expect(alertEl).toBeFalsy();
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

  it('#processing should show/hide overlay spinner', () => {

    expect(component.processing).toBe(false);

    let spinner: HTMLElement = fixture.nativeElement
      .querySelector('ra-overlay-spinner');
    expect(spinner).toBeFalsy();

    component.processing = true;
    fixture.detectChanges();

    spinner = fixture.nativeElement
      .querySelector('ra-overlay-spinner');
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

});
