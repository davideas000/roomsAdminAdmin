import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaNewReservationFormComponent } from './new-reservation-form.component';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RaAngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RaApiService } from 'src/app/api.service';
import { Location } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import * as moment from 'moment';
import { RaNMessageType, RaNMessageMsgType } from '../new-reservation-message/nmessage.model';

@Component({selector: 'ra-new-reservation-message', template: ''})
class FakeMessage {
  @Input() message;
}

describe('RaNewReservationFormComponent', () => {
  let component: RaNewReservationFormComponent;
  let fixture: ComponentFixture<RaNewReservationFormComponent>;

  beforeEach(async(() => {
    let apiSpy = jasmine.createSpyObj('RaApiService',
                                      ['newReservation$']);
    let locationSpy = jasmine.createSpyObj('Location', ['back']);
    TestBed.configureTestingModule({
      declarations: [ RaNewReservationFormComponent, FakeMessage ],
      imports: [ ReactiveFormsModule, RaAngularMaterialModule,
                 SharedModule, NoopAnimationsModule ],
      providers: [
        {provide: RaApiService, useValue: apiSpy},
        {provide: Location, useValue: locationSpy}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaNewReservationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call `apiService.newReservation$()` on form'
     + '`ngSubmt` event', () => {
       let startDateEl: HTMLInputElement = fixture.nativeElement
         .querySelector('input[formControlName=startDate]');
       let endDateEl: HTMLInputElement = fixture.nativeElement
         .querySelector('input[formControlName=endDate]');
       let startTimeEl: HTMLInputElement = fixture.nativeElement
         .querySelector('input[formControlName=startTime]');
       let endTimeEl: HTMLInputElement = fixture.nativeElement
         .querySelector('input[formControlName=endTime]');
       let reasonEl: HTMLTextAreaElement = fixture.nativeElement
         .querySelector('textarea[formControlName=reason]');

       let stubValues = {
         room: 'roomid',
         startDate: '01-01-2019',
         endDate:  '01-02-2019',
         startTime: '10:11',
         endTime: '11:11',
         reason: 'some reason'
       };

       let spectedValues = {
         room: 'roomid',
         startDate: moment('2019-01-01').format('YYYY-MM-DD'),
         endDate:  moment('2019-01-02').format('YYYY-MM-DD'),
         startTime: '10:11',
         endTime: '11:11',
         reason: 'some reason'
       };

       startDateEl.value = stubValues.startDate;
       startDateEl.dispatchEvent(new Event('input'));
       endDateEl.value = stubValues.endDate;
       endDateEl.dispatchEvent(new Event('input'));
       startTimeEl.value = stubValues.startTime;
       startTimeEl.dispatchEvent(new Event('input'));
       endTimeEl.value = stubValues.endTime;
       endTimeEl.dispatchEvent(new Event('input'));
       reasonEl.value = stubValues.reason
       reasonEl.dispatchEvent(new Event('input'));

       component.room = {_id: stubValues.room} as any;

       let apiSpy = fixture.debugElement.injector
         .get(RaApiService) as jasmine.SpyObj<RaApiService>;
       apiSpy.newReservation$.and.returnValue(of({}));

       fixture.detectChanges();

       let formEl: HTMLFormElement = fixture.nativeElement
         .querySelector('form');
       formEl.dispatchEvent(new Event('ngSubmit'));


       expect(apiSpy.newReservation$).toHaveBeenCalledTimes(1);
       expect(apiSpy.newReservation$).toHaveBeenCalledWith(spectedValues);
     });

  it('#setRoomName() should set the value of '
     + '`input[formControlName=room]`' ,
     () => {
       let roomStub: any = {
         _id: 'roomid',
         name: 'roomname',
         type: 'roomtype',
         department: {acronym: 'depacronym'}
       };
       component.room = roomStub;
       component.setRoomName();

       const roomEl: HTMLInputElement = fixture.nativeElement
         .querySelector('input[formControlName=room]');
       expect(roomEl.value).toBe(
         `${roomStub.name} (${roomStub.type} - ${roomStub.department.acronym})`
       );
     });

  it('#onFormSubmit() should display a message on success', () => {
    let stubValues = {
      room: 'room',
      startDate: moment('2019-01-01'),
      endDate: moment('2019-01-02'),
      startTime: '01:10',
      endTime: '01:11',
      reason: 'some reasom'
    };

    component.form.setValue(stubValues);
    component.room = {_id: 'roomid'} as any;

    let apiSpy = fixture.debugElement.injector
      .get(RaApiService) as jasmine.SpyObj<RaApiService>;
    apiSpy.newReservation$.and.returnValue(of('success'));

    component.onFormSubmit();
    fixture.detectChanges();

    let msgEl: HTMLElement = fixture.nativeElement
      .querySelector('ra-new-reservation-message');

    expect(msgEl).toBeTruthy();
    expect(component.msgConfig.show).toBe(true);
    expect(component.msgConfig.type).toBe(RaNMessageType.success);
    expect(component.msgConfig.msgType).toBe(RaNMessageMsgType.success);
  });

  it('#onFormSubmit() should display an error message on '
     + 'reservation processing failure', () => {
       let stubValues = {
         room: 'room',
         startDate: moment('2019-01-01'),
         endDate: moment('2019-01-02'),
         startTime: '01:10',
         endTime: '01:11',
         reason: 'some reasom'
       };

       component.form.setValue(stubValues);
       component.room = {_id: 'roomid'} as any;

       let apiSpy = fixture.debugElement.injector
         .get(RaApiService) as jasmine.SpyObj<RaApiService>;
       apiSpy.newReservation$.and.returnValue(
         throwError({error: {message: 'overlapping-reservation'}}));

       component.onFormSubmit();
       fixture.detectChanges();

       let msgEl: HTMLElement = fixture.nativeElement
         .querySelector('ra-new-reservation-message');

       expect(msgEl).toBeTruthy();
       expect(component.msgConfig.show).toBe(true);
       expect(component.msgConfig.type).toBe(RaNMessageType.error);
       expect(component.msgConfig.msgType)
         .toBe(RaNMessageMsgType.error);
     });

  it('#onFormSubmit() should display an error message on '
     + 'any other error', () => {
       let stubValues = {
         room: 'room',
         startDate: moment('2019-01-01'),
         endDate: moment('2019-01-02'),
         startTime: '01:10',
         endTime: '01:11',
         reason: 'some reasom'
       };

       component.form.setValue(stubValues);
       component.room = {_id: 'roomid'} as any;

       let apiSpy = fixture.debugElement.injector
         .get(RaApiService) as jasmine.SpyObj<RaApiService>;
       apiSpy.newReservation$.and.returnValue(
         throwError({error: 'any other error'}));

       component.onFormSubmit();
       fixture.detectChanges();

       let msgEl: HTMLElement = fixture.nativeElement
         .querySelector('ra-new-reservation-message');

       expect(msgEl).toBeTruthy();
       expect(component.msgConfig.show).toBe(true);
       expect(component.msgConfig.type).toBe(RaNMessageType.error);
       // it assumes that all errors that aren't a reservation
       // failure error are network errors, this probably should
       // be refactored
       expect(component.msgConfig.msgType)
         .toBe(RaNMessageMsgType.neterror);
     });

  it('#processing should toggle on/off `ra-overlay-spinner`', () => {
    // toggle on
    component.processing = true;
    fixture.detectChanges();

    let overlaySpinnerEl = fixture.nativeElement
      .querySelector('ra-overlay-spinner');

    expect(overlaySpinnerEl).toBeTruthy();

    // toggle off
    component.processing = false;
    fixture.detectChanges();

    overlaySpinnerEl = fixture.nativeElement
      .querySelector('ra-overlay-spinner');

    expect(overlaySpinnerEl).toBeFalsy();
  });

  it('should hide `<ra-new-reservation-message>` when <ra-new-reservation-message> '
     + 'raises a close event', () => {
       component.msgConfig = {
         type: RaNMessageType.error,
         msgType: RaNMessageMsgType.error,
         show: true
       };
       fixture.detectChanges();

       let msgEl: HTMLElement = fixture.nativeElement
         .querySelector('ra-new-reservation-message');

       msgEl.dispatchEvent(new Event('close'));

       fixture.detectChanges();

       msgEl = fixture.nativeElement
         .querySelector('ra-new-reservation-message');

       expect(msgEl).toBeFalsy();
       expect(component.msgConfig.show).toBe(false);
     });

  it('cancel button should take the user to the previous page', () => {
    let cancelBtn: HTMLButtonElement = fixture.nativeElement
      .querySelector('.form-btns button[type=button]');

    cancelBtn.dispatchEvent(new Event('click'));

    const locationSpy = fixture.debugElement.injector
      .get(Location) as jasmine.SpyObj<Location>;

    expect(locationSpy.back).toHaveBeenCalledTimes(1);
  });

});
