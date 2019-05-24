import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaReservationComponent } from './reservation.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const roomStub = {
  name: 'sala 100',
  description: 'sala comum',
  id: 'roomid 1',
  width: 200,
  length: 300,
  capacity: 10,
  type: 'sala',
  department: {_id: '001', acronym: 'dep'},
  photos: [
    '#'
  ]
};

const reservationStub: any =   {
  reason: 'aula de alguma coisa, e outra coisa',
  startDate: new Date('2018-08-01T00:00:00+0000'),
  endDate: new Date('2018-08-31T00:00:00+0000'),
  startTime: new Date('2018-01-01T08:00+0000'),
  endTime: new Date('2018-01-01T18:00+0000'),
  code: 21,
  sequence: 1,
  status: 'approved',
  room: roomStub
} ;


describe('RaReservationComponent', () => {
  let component: RaReservationComponent;
  let fixture: ComponentFixture<RaReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaReservationComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaReservationComponent);
    component = fixture.componentInstance;
    component.reservation = reservationStub;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display reservation info', () => {
    const roomName: HTMLElement = fixture.nativeElement
      .querySelector('mat-card-title a.ra-reservation-title');
    const roomTypeDep: HTMLElement = fixture.nativeElement
      .querySelector('mat-card-subtitle');
    const roomPhoto: HTMLImageElement = fixture.nativeElement
      .querySelector('img.room-photo');
    const periodDates: HTMLImageElement = fixture.nativeElement
      .querySelector('p span.r-label:first-child');
    const periodTimes: HTMLImageElement = fixture.nativeElement
      .querySelector('p span.r-label:last-child');
    const reason: HTMLElement = fixture.nativeElement
      .querySelector('mat-card-content p:last-child');

    expect(roomName.textContent).toBe(reservationStub.room.name);
    expect(roomTypeDep.textContent).toBe(
      `${reservationStub.room.type}, ${reservationStub.room.department.acronym}`
    );
    expect(roomPhoto).toBeTruthy();
    expect(roomPhoto.src).toBeTruthy();
    expect(periodDates.textContent).toBeTruthy();
    expect(periodDates.textContent).toBeTruthy();
    expect(periodTimes.textContent).toBeTruthy();
    expect(reason.textContent).toBe(reservationStub.reason);
  });

  it('#showPhoto should show/hide the photo of the reserved room',
     () => {
       // default to true
       let photo: HTMLImageElement = fixture.nativeElement
         .querySelector('img.room-photo');

       expect(photo).toBeTruthy();
       expect(photo.src).toBeTruthy();

       // hide
       component.showPhoto = false;
       fixture.detectChanges();

       photo = fixture.nativeElement
         .querySelector('img.room-photo');

       expect(photo).toBeFalsy();
     });

  it('#showActions should show/hide actions buttons', () =>
     {
       // default to true
       let actions: HTMLElement = fixture.nativeElement
         .querySelector('mat-card-actions');

       expect(actions).toBeTruthy();

       // hide
       component.showActions = false;
       fixture.detectChanges();

       actions = fixture.nativeElement
         .querySelector('mat-card-actions');

       expect(actions).toBeFalsy();
     });

  it('#showTitle should show/hide reservation title',
     () => {
       // default to true
       let title: HTMLElement = fixture.nativeElement
         .querySelector('mat-card-title-group');

       expect(title).toBeTruthy();

       // hide
       component.showTitle = false;
       fixture.detectChanges();

       title = fixture.nativeElement
         .querySelector('mat-card-title-group');

       expect(title).toBeFalsy();
     });

  it('#showStatus should show/hide reservation status', () =>
     {
       // default to false
       let status: HTMLElement = fixture.nativeElement
         .querySelector('mat-chip');

       expect(status).toBeFalsy();

       // show
       component.showStatus = true;
       fixture.detectChanges();

       status = fixture.nativeElement
         .querySelector('mat-chip');

       expect(status).toBeTruthy();
     });

  it('#should display a placeholder when `reservation.room.photos` '
     + 'is empty', () => {
       component.reservation.room.photos = [];
       fixture.detectChanges();

       const placeholder: HTMLElement = fixture.nativeElement
         .querySelector('ra-image-placeholder');

       expect(placeholder).toBeTruthy();
     });

});
