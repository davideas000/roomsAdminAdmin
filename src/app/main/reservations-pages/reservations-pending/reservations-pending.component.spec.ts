import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaReservationsPendingComponent } from './reservations-pending.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RaHeaderTitleService } from '../../header/header-title.service';
import { RaApiService } from 'src/app/api.service';
import { of } from 'rxjs';

describe('RaReservationsPendingComponent', () => {
  let component: RaReservationsPendingComponent;
  let fixture: ComponentFixture<RaReservationsPendingComponent>;

  let reservsStub: any = [
    {_id: 'reser001'},
    {_id: 'reser002'},
    {_id: 'reser003'},
    {_id: 'reser004'},
    {_id: 'reser005'}
  ];

  beforeEach(async(() => {
    const titleSpy = jasmine.createSpyObj('Title', ['setTitle']);
    const headerTitleSpy = jasmine.createSpyObj('RaHeaderTitle',
                                                ['setTitle']);
    const apiSpy = jasmine.createSpyObj(
      'RaApiService', ['getPendingReservations$']);
    apiSpy.getPendingReservations$
      .and.returnValue(of(reservsStub));

    TestBed.configureTestingModule({
      declarations: [ RaReservationsPendingComponent ],
      providers: [
        {provide: RaApiService, useValue: apiSpy},
        {provide: Title, useValue: titleSpy},
        {provide: RaHeaderTitleService, useValue: headerTitleSpy}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaReservationsPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch reservations at startup', () => {
       const apiSpy = fixture.debugElement.injector
         .get(RaApiService) as jasmine.SpyObj<RaApiService>;

       expect(component.reservations).toEqual(reservsStub);
       expect(component.loading).toBe(false);
       expect(apiSpy.getPendingReservations$)
         .toHaveBeenCalledTimes(1);
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
