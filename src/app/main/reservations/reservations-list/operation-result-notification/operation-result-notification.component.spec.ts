import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaOperationResultNotificationComponent } from './operation-result-notification.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material';

describe('RaOperationResultNotificationComponent', () => {
  let component: RaOperationResultNotificationComponent;
  let fixture: ComponentFixture<RaOperationResultNotificationComponent>;

  beforeEach(async(() => {
    const snackSpy = jasmine.createSpyObj('MatSnackBarRef', ['dismiss']);
    TestBed.configureTestingModule({
      declarations: [ RaOperationResultNotificationComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        {provide: MAT_SNACK_BAR_DATA, useValue: {}},
        {provide: MatSnackBarRef, useValue: snackSpy}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaOperationResultNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a message according to #config.type', () => {
    component.config.type = 'remove';
    fixture.detectChanges();
    const message = fixture.nativeElement
      .querySelector('p');
    expect(message).toBeTruthy();
    expect(message.textContent).toBe('Reserva removida com sucesso');

    component.config.type = 'approve';
    fixture.detectChanges();
    expect(message.textContent).toBe('Reserva aprovada com sucesso');

    component.config.type = 'reject';
    fixture.detectChanges();
    expect(message.textContent).toBe('Reserva rejeitada com sucesso');
  });

  it('should display an error message when `#config.type === \'error\'`',
     () => {
       component.config.type = 'error';
       fixture.detectChanges();

       const errorEl: HTMLElement = fixture.nativeElement
         .querySelector('Ra-message-panel');

       expect(errorEl).toBeTruthy();
       expect(errorEl.textContent).toBeTruthy();
     });

  it('should dismiss snackbar when `close button` is clicked', () => {
    // close button is only displayed when `#config.type === 'error'`
    component.config.type = 'error';
    fixture.detectChanges();

    const button: HTMLButtonElement = fixture.nativeElement
      .querySelector('.error button')
    expect(button).toBeTruthy();

    button.dispatchEvent(new Event('click'));

    const spy = fixture.debugElement.injector
      .get(MatSnackBarRef) as jasmine.SpyObj<MatSnackBarRef<any>>;

    expect(spy.dismiss).toHaveBeenCalledTimes(1);
  });

});
