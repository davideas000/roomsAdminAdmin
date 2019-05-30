import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaReservationsPanelComponent } from './reservations-panel.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';
import { RaApiService } from 'src/app/api.service';
import { RaResponsiveService } from 'src/app/responsive.service';
import * as moment from 'moment';

// helpers
function getPeriod(d) {
  let period: any = {};
  switch(d) {
    case 'today':
      const today = moment().format('YYYY-MM-DD');
      period.startDate = today;
      period.endDate = today;
      break;
    case 'month':
      let month = moment(1, 'DD');
      period.startDate = month.format('YYYY-MM-DD');
      month = month.date(31);
      period.endDate = month.format('YYYY-MM-DD');
      break;
    case 'year':
      let year = moment('01 01', 'DD MM');
      period.startDate = year.format('YYYY-MM-DD');
      year = year.date(31).month(11);
      period.endDate = year.format('YYYY-MM-DD');
      break;
  }
  return period;
}

describe('RaReservationsPanelComponent', () => {
  let component: RaReservationsPanelComponent;
  let fixture: ComponentFixture<RaReservationsPanelComponent>;
  const reservsStub: any = [{_id: 'reserv01'}, {_id: 'resevs02'}];
  const roomidStub = 'room01';

  beforeEach(async(() => {
    const resSpy = jasmine.createSpyObj('RaResponsiveService',
                                        ['isActive']);
    const apiSpy = jasmine.createSpyObj(
      'RaApiService',
      ['getReservationsByRoomAndPeriod$']
    );
    apiSpy.getReservationsByRoomAndPeriod$.and
      .returnValue(of(reservsStub));
    TestBed.configureTestingModule({
      declarations: [ RaReservationsPanelComponent ],
      providers: [
        {provide: RaApiService, useValue: apiSpy},
        {provide: RaResponsiveService, useValue: resSpy}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaReservationsPanelComponent);
    component = fixture.componentInstance;
    component.roomid = roomidStub;
    fixture.detectChanges();
  });

  it('#loading should show/hide the spinner', () => {
    component.loading = true;
    fixture.detectChanges();

    let spinner: HTMLElement = fixture.nativeElement
      .querySelector('mat-spinner');

    expect(spinner).toBeTruthy();

    component.loading = false;
    fixture.detectChanges();

    spinner = fixture.nativeElement
      .querySelector('mat-spinner');

    expect(spinner).toBeFalsy();
  });

  // screen sizes are defined by the responsive service
  it('should display a divider for small screens', () => {
    // default to hide
    let divider = fixture.nativeElement
      .querySelector('mat-divider');
    expect(divider).toBeFalsy();

    const resSpy = fixture.debugElement.injector
      .get(RaResponsiveService) as jasmine.SpyObj<RaResponsiveService>;
    resSpy.isActive.and.returnValue(true);

    fixture.detectChanges();

    divider = fixture.nativeElement
      .querySelector('mat-divider');
    expect(divider).toBeTruthy();

    expect(resSpy.isActive).toHaveBeenCalled();
    expect(resSpy.isActive).toHaveBeenCalledWith('xs');
  });

  it('should fetch reservations at initialization', () => {
    const apiSpy = fixture.debugElement.injector
      .get(RaApiService) as jasmine.SpyObj<RaApiService>;

    expect(apiSpy.getReservationsByRoomAndPeriod$)
      .toHaveBeenCalledTimes(1);
    expect(apiSpy.getReservationsByRoomAndPeriod$)
      .toHaveBeenCalledWith(roomidStub, null);

    const reservsList = fixture.nativeElement
      .querySelector('ra-reservations-list');
    expect(reservsList).toBeTruthy();
  });

  it('should display an error message if the reservations '
     + 'fetch fails', () => {
       const apiSpy = fixture.debugElement.injector
         .get(RaApiService) as jasmine.SpyObj<RaApiService>;

       apiSpy.getReservationsByRoomAndPeriod$.and
         .returnValue(throwError('error'));

       component.fetchReservations$.next();
       fixture.detectChanges();

       expect(component.error).toBe(true);

       const error: HTMLElement = fixture.nativeElement
         .querySelector('ra-message-panel');

       expect(error).toBeTruthy();
       expect(error.textContent).toBeTruthy();
     });

  it('should call #apiService.getReservationsByRoomAndPeriod$() when '
     + '`<ra-reservations-panel-header>` raises a filter event', () => {
       const panelHeader: HTMLElement = fixture.nativeElement
         .querySelector('ra-reservations-panel-header');

       panelHeader.dispatchEvent(new Event('filter'));

       const apiSpy = fixture.debugElement.injector
         .get(RaApiService) as jasmine.SpyObj<RaApiService>;

       // it's called two times, one at the initialization
       // and the other when the <ra-reservations-panel-header> emits
       // a filter event
       expect(apiSpy.getReservationsByRoomAndPeriod$)
         .toHaveBeenCalledTimes(2);
       expect(apiSpy.getReservationsByRoomAndPeriod$)
         .toHaveBeenCalledWith(roomidStub, {});
     });

  it('should filter reservations by period', () => {
    const apiSpy = fixture.debugElement.injector
      .get(RaApiService) as jasmine.SpyObj<RaApiService>;

    // get today's reservations
    component.filterBy('today');

    let expectedPeriod = getPeriod('today');

    expect(apiSpy.getReservationsByRoomAndPeriod$)
      .toHaveBeenCalledTimes(2);
    expect(apiSpy.getReservationsByRoomAndPeriod$)
      .toHaveBeenCalledWith(roomidStub, expectedPeriod);

    // get this month's reservations
    component.filterBy('month');

    expectedPeriod = getPeriod('month');

    expect(apiSpy.getReservationsByRoomAndPeriod$)
      .toHaveBeenCalledTimes(3);
    expect(apiSpy.getReservationsByRoomAndPeriod$)
      .toHaveBeenCalledWith(roomidStub, expectedPeriod);

    // get this year's reservations
    component.filterBy('year');

    expectedPeriod = getPeriod('year');

    expect(apiSpy.getReservationsByRoomAndPeriod$)
      .toHaveBeenCalledTimes(4);
    expect(apiSpy.getReservationsByRoomAndPeriod$)
      .toHaveBeenCalledWith(roomidStub, expectedPeriod);

    // get all reservations
    component.filterBy('all');

    expectedPeriod = getPeriod('all');

    expect(apiSpy.getReservationsByRoomAndPeriod$)
      .toHaveBeenCalledTimes(5);
    expect(apiSpy.getReservationsByRoomAndPeriod$)
      .toHaveBeenCalledWith(roomidStub, expectedPeriod); // this is the same as `.toHaveBeenCalledWith(roomidStub, {})`
  });

});
