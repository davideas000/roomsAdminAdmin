import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaNewReservationComponent } from './new-reservation.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RaApiService } from 'src/app/api.service';
import { of, throwError } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { RaHeaderTitleService } from '../header/header-title.service';

describe('RaNewReservationComponent', () => {
  let component: RaNewReservationComponent;
  let fixture: ComponentFixture<RaNewReservationComponent>;
  let roomidStub = 'roomid';
  let roomStub: any = {_id: 'roomid'};

  beforeEach(async(() => {

    const routeSpy = jasmine.createSpyObj('ActivatedRoute', ['']);
    routeSpy.paramMap = of({get: (_) => roomidStub})

    const apiSpy = jasmine.createSpyObj('RaApiService', ['getRoomById$']);
    apiSpy.getRoomById$.and.returnValue(of(roomStub));

    const titleSpy = jasmine.createSpyObj('Title', ['setTitle']);
    const headerTitleSpy = jasmine.createSpyObj('RaHeaderTitleService',
                                                ['setTitle']);

    TestBed.configureTestingModule({
      declarations: [ RaNewReservationComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: routeSpy},
        {provide: RaApiService, useValue: apiSpy},
        {provide: Title, useValue: titleSpy},
        {provide: RaHeaderTitleService, useValue: headerTitleSpy}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaNewReservationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should fetch room on initialization', () => {
    fixture.detectChanges();
    const apiSpy = fixture.debugElement.injector
      .get(RaApiService) as jasmine.SpyObj<RaApiService>;

    expect(apiSpy.getRoomById$).toHaveBeenCalledTimes(1);
    expect(apiSpy.getRoomById$).toHaveBeenCalledWith(roomidStub);
    expect(component.room).toBe(roomStub);
  });

  it('should get the page title from the template', () => {
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

  it('#loading should show/hide spinner', () => {
    fixture.detectChanges();
    component.loading = true;
    fixture.detectChanges();

    let spinnerEl: HTMLElement = fixture.nativeElement
      .querySelector('mat-spinner');

    expect(spinnerEl).toBeTruthy();

    component.loading = false;
    fixture.detectChanges();

    spinnerEl = fixture.nativeElement
      .querySelector('mat-spinner');
    expect(spinnerEl).toBeFalsy();
  });

  it('should display an error message when '
     + '`RaApiService.getRoomById$()` returns an error', () => {
       const apiSpy = fixture.debugElement.injector
         .get(RaApiService) as jasmine.SpyObj<RaApiService>;

       apiSpy.getRoomById$.and.returnValue(throwError('irror'));
       fixture.detectChanges();

       const errorMsgEl: HTMLElement = fixture.nativeElement
         .querySelector('ra-message-panel');

       expect(errorMsgEl).toBeTruthy();
       expect(component.error).toBe(true);
     });

});
