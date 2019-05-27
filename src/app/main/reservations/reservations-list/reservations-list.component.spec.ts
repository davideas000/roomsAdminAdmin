import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaReservationsListComponent } from './reservations-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RaApiService } from 'src/app/api.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { of, throwError } from 'rxjs';
import { RaConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { RaOperationResultNotificationComponent } from './operation-result-notification/operation-result-notification.component';

describe('RaReservationsListComponent', () => {
  let component: RaReservationsListComponent;
  let fixture: ComponentFixture<RaReservationsListComponent>;

  beforeEach(async(() => {

    let apiSpy = jasmine.createSpyObj('RaApiService',
                                      ['removeReservation$']);
    let dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    let snackBarSpy = jasmine.createSpyObj('MatSnackBar',
                                           ['openFromComponent']);

    TestBed.configureTestingModule({
      declarations: [ RaReservationsListComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        {provide: RaApiService, useValue: apiSpy},
        {provide: MatDialog, useValue: dialogSpy},
        {provide: MatSnackBar, useValue: snackBarSpy}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaReservationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#listype should set/unset `.list` CSS class on the <ul>', () => {
    // default to false
    const ul: HTMLElement = fixture.nativeElement
      .querySelector('ul');

    expect(ul.classList.contains('list')).toBe(false);

    component.listtype = 'list';
    fixture.detectChanges();
    expect(ul.classList.contains('list')).toBe(true);
  });

  it('display reservations', () => {
    let reservationsStub: any = [
      {_id: '001'}, {_id: '002'}, {_id: '003'}, {_id: '004'}
    ];
    component.reservations = reservationsStub;
    fixture.detectChanges();

    const reservs: NodeList = fixture.nativeElement
      .querySelectorAll('ra-reservation');

    expect(reservs.length).toBe(reservationsStub.length);
  });

  it('should remove the reservation (`<ra-reservation>`) that raises '
     + 'a remove event', () => {
       const reservationsStub: any = [
         {_id: 'reserv01'}, {_id: 'reserv02'}
       ];
       component.reservations = reservationsStub;
       fixture.detectChanges();
       const reservation: HTMLElement = fixture.nativeElement
         .querySelector('ra-reservation');
       expect(reservation).toBeTruthy();

       const dialogSpy = fixture.debugElement.injector
         .get(MatDialog) as jasmine.SpyObj<MatDialog>;

       const dialogRefMock = {afterClosed: () => of(true)};
       dialogSpy.open.and.returnValue(dialogRefMock);

       const apiSpy = fixture.debugElement.injector
         .get(RaApiService) as jasmine.SpyObj<RaApiService>;
       apiSpy.removeReservation$.and.returnValue(of(true));

       const snackSpy = fixture.debugElement.injector
         .get(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;

       reservation.dispatchEvent(new Event('remove'));
       fixture.detectChanges();

       expect(dialogSpy.open).toHaveBeenCalledTimes(1);
       expect(dialogSpy.open).toHaveBeenCalledWith(
         RaConfirmationDialogComponent, {data: {type: 'remove',
                                                showMessage: true,
                                                showTextarea: false}});
       expect(apiSpy.removeReservation$).toHaveBeenCalledTimes(1);
       expect(apiSpy.removeReservation$)
         .toHaveBeenCalledWith(reservationsStub[0]);
       expect(snackSpy.openFromComponent).toHaveBeenCalledTimes(1);

       expect(snackSpy.openFromComponent).toHaveBeenCalledWith(
         RaOperationResultNotificationComponent,
         {
           data: {type: 'removed'},
           duration: 2000
         }
       );

       let result = false;
       component.reservations.forEach(
         reservation => {
           if(reservation._id === reservationsStub[0]._id)
           { result = true}
         }
       );
       expect(result).toBe(false);

       const reservsEl: NodeList = fixture.nativeElement
         .querySelectorAll('ra-reservation');
       expect(reservsEl.length).toBe(1);
     });

  it('should display a snackbar with an error message when the removal of '
     + 'a reservation fails', () => {

       const reservationsStub: any = [
         {_id: 'reservA'}, {_id: 'reservB'}
       ];

       const dialogSpy = fixture.debugElement.injector
         .get(MatDialog) as jasmine.SpyObj<MatDialog>;

       const dialogRefMock = {afterClosed: () => of(true)};
       dialogSpy.open.and.returnValue(dialogRefMock);

       const apiSpy = fixture.debugElement.injector
         .get(RaApiService) as jasmine.SpyObj<RaApiService>;
       // fails with a error
       apiSpy.removeReservation$.and.returnValue(throwError('error'));

       const snackSpy = fixture.debugElement.injector
         .get(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;

       component.remove(reservationsStub[0]);

       expect(dialogSpy.open).toHaveBeenCalledTimes(1);
       expect(dialogSpy.open).toHaveBeenCalledWith(
         RaConfirmationDialogComponent, {data: {type: 'remove',
                                                showMessage: true,
                                                showTextarea: false}});

       expect(apiSpy.removeReservation$).toHaveBeenCalledTimes(1);
       expect(apiSpy.removeReservation$)
         .toHaveBeenCalledWith(reservationsStub[0]);

       expect(snackSpy.openFromComponent).toHaveBeenCalledTimes(1);
       expect(snackSpy.openFromComponent).toHaveBeenCalledWith(
         RaOperationResultNotificationComponent,
         {data: {type: 'error'}}
       );

     });

});
