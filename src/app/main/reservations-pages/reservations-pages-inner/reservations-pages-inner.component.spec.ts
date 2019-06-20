import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaReservationsPagesInnerComponent } from './reservations-pages-inner.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RaApiService } from 'src/app/api.service';

import { of, throwError } from 'rxjs';

describe('RaReservationsPagesInnerComponent', () => {
  let component: RaReservationsPagesInnerComponent;
  let fixture: ComponentFixture<RaReservationsPagesInnerComponent>;

  let reservsStub: any = [
    {_id: 'reser001'},
    {_id: 'reser002'},
    {_id: 'reser003'},
    {_id: 'reser004'},
    {_id: 'reser005'}
  ];

  beforeEach(async(() => {
    const apiSpy = jasmine.createSpyObj(
      'RaApiService',
      [
        'getApprovedReservations$',
        'getPendingReservations$',
        'getApprovedReservationsByDep$',
        'getPendingReservationsByDep$'
      ]);
    TestBed.configureTestingModule({
      declarations: [ RaReservationsPagesInnerComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [ {provide: RaApiService, useValue: apiSpy} ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaReservationsPagesInnerComponent);
    component = fixture.componentInstance;
  });

  it('should fetch approved reservation when #pageType is '
     + '`approved-reservations`', () => {
       const apiSpy = fixture.debugElement.injector
         .get(RaApiService) as jasmine.SpyObj<RaApiService>;
       apiSpy.getApprovedReservations$.and.returnValue(of(reservsStub));

       component.pageType = 'approved-reservations';
       fixture.detectChanges();

       expect(component.reservations).toEqual(reservsStub);
       expect(component.loading).toBe(false);
       expect(apiSpy.getApprovedReservations$).toHaveBeenCalledTimes(1);
     });

  it('should fetch approved reservation by department when #pageType is '
     + '`approved-reservations-dep`', () => {
       const apiSpy = fixture.debugElement.injector
         .get(RaApiService) as jasmine.SpyObj<RaApiService>;
       apiSpy.getApprovedReservationsByDep$
         .and.returnValue(of(reservsStub));

       component.pageType = 'approved-reservations-dep';
       fixture.detectChanges();

       expect(component.reservations).toEqual(reservsStub);
       expect(component.loading).toBe(false);
       expect(apiSpy.getApprovedReservationsByDep$)
         .toHaveBeenCalledTimes(1);
     });

  it('should fetch pending reservation when #pageType is'
     + '`pending-reservations`', () => {
       const apiSpy = fixture.debugElement.injector
         .get(RaApiService) as jasmine.SpyObj<RaApiService>;
       apiSpy.getPendingReservations$.and.returnValue(of(reservsStub));

       component.pageType = 'pending-reservations';

       fixture.detectChanges();

       expect(component.reservations).toEqual(reservsStub);
       expect(component.loading).toBe(false);

       expect(apiSpy.getPendingReservations$).toHaveBeenCalledTimes(1);
     });

  it('should fetch pending reservation by department when #pageType is'
     + '`pending-reservations-dep`', () => {
       const apiSpy = fixture.debugElement.injector
         .get(RaApiService) as jasmine.SpyObj<RaApiService>;
       apiSpy.getPendingReservationsByDep$
         .and.returnValue(of(reservsStub));

       component.pageType = 'pending-reservations-dep';
       fixture.detectChanges();

       expect(component.reservations).toEqual(reservsStub);
       expect(component.loading).toBe(false);
       expect(apiSpy.getPendingReservationsByDep$)
         .toHaveBeenCalledTimes(1);
     });

  it('#loading should show/hide spinner', () => {
    // setup necessary to avoid error
    const apiSpy = fixture.debugElement.injector
      .get(RaApiService) as jasmine.SpyObj<RaApiService>;
    apiSpy.getPendingReservationsByDep$
      .and.returnValue(of(reservsStub));
    component.pageType = 'pending-reservations-dep';
    fixture.detectChanges();

    // case false
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

  it('should display an error msg when the fetch of reservations fails',
     () => {
       const apiSpy = fixture.debugElement.injector
         .get(RaApiService) as jasmine.SpyObj<RaApiService>;
       apiSpy.getApprovedReservations$
         .and.returnValue(throwError('error'));

       component.pageType = 'approved-reservations';
       fixture.detectChanges();

       expect(component.loading).toBe(false);
       expect(component.error).toBe(true);

       const errorMsgEl: HTMLElement = fixture.nativeElement
         .querySelector('ra-message-panel');

       expect(errorMsgEl).toBeTruthy();
       expect(errorMsgEl.textContent).toBeTruthy();
     });

});
