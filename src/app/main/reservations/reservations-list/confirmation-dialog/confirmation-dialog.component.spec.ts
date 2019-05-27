import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaConfirmationDialogComponent } from './confirmation-dialog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

describe('RaConfirmationDialogComponent', () => {
  let component: RaConfirmationDialogComponent;
  let fixture: ComponentFixture<RaConfirmationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaConfirmationDialogComponent ],
      providers: [{provide: MAT_DIALOG_DATA, useValue: {}}],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a title according to #config.type', () => {
    component.config.type = 'reject';
    fixture.detectChanges();

    const title: HTMLElement = fixture.nativeElement
      .querySelector('h2');

    expect(title.textContent).toBe('Rejeitar reserva');

    component.config.type = 'approve';
    fixture.detectChanges();
    expect(title.textContent).toBe('Aprovar reserva');

    component.config.type = 'remove';
    fixture.detectChanges();
    expect(title.textContent).toBe('Remover reserva');
  });

  it('#config.showMessage should show/hide removal warn message',
     () =>{
       component.config.showMessage = true;
       component.config.type = 'remove';
       fixture.detectChanges();

       let msg: HTMLElement = fixture.nativeElement
         .querySelector('mat-dialog-content p');

       expect(msg).toBeTruthy();
       expect(msg.textContent).toBeTruthy();

       component.config.showMessage = false;
       fixture.detectChanges();
       msg = fixture.nativeElement
         .querySelector('mat-dialog-content p');

       expect(msg).toBeFalsy();
     });

  it('#config.showTextarea should show/hide `<textarea>`', () => {
    component.config.showTextarea = true;
    component.config.type = 'remove';
    fixture.detectChanges();

    let textarea: HTMLElement = fixture.nativeElement
      .querySelector('mat-dialog-content textarea');

    expect(textarea).toBeTruthy();

    component.config.showTextarea = false;
    fixture.detectChanges();
    textarea = fixture.nativeElement
      .querySelector('mat-dialog-content textarea');

    expect(textarea).toBeFalsy();
  });

  it('should display confirmation button according to #config.type',
     () => {
       component.config.type = 'remove';
       fixture.detectChanges();
       const button: HTMLElement = fixture.nativeElement
         .querySelector('.btns-wrapper button:last-child');
       expect(button).toBeTruthy();
       expect(button.textContent).toBe('Remover');

       component.config.type = 'reject';
       fixture.detectChanges();
       expect(button.textContent).toBe('Rejeitar');

       component.config.type = 'approve';
       fixture.detectChanges();
       expect(button.textContent).toBe('Aprovar');
     });

  it('should not display message and textarea when '
     + '#config.type === \'approve\'', () => {
       component.config.type ='approve';
       fixture.detectChanges();

       const dialogContent: HTMLElement = fixture.nativeElement
         .querySelector('mat-dialog-content');
       expect(dialogContent).toBeFalsy();
     });

});
