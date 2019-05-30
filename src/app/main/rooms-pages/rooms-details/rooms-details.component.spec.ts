import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaRoomsDetailsComponent } from './rooms-details.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatMenuModule } from '@angular/material';
import { RaApiService } from 'src/app/api.service';
import { of, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RaHeaderTitleService } from '../../header/header-title.service';
import { Title } from '@angular/platform-browser';

describe('RaRoomsDetailsComponent', () => {
  let component: RaRoomsDetailsComponent;
  let fixture: ComponentFixture<RaRoomsDetailsComponent>;
  let roomidStub = 'roomid';

  beforeEach(async(() => {
    const apiSpy = jasmine.createSpyObj(
      'RaApiService',
      ['getRoomById$', 'getReservationsByRoomAndPeriod$']
    );
    const routeSpy = jasmine.createSpyObj('ActivatedRoute', ['']);
    routeSpy.paramMap = of({get: (_) => roomidStub});
    const headerTitleSpy = jasmine.createSpyObj(
      'RaHeaderTitleSpy', ['setTitle']);
    const titleSpy = jasmine.createSpyObj(
      'TitleSpy', ['setTitle']);
    TestBed.configureTestingModule({
      declarations: [ RaRoomsDetailsComponent ],
      imports: [ MatMenuModule ],
      providers: [
        {provide: RaApiService, useValue: apiSpy},
        {provide: ActivatedRoute, useValue: routeSpy},
        {provide: RaHeaderTitleService, useValue: headerTitleSpy},
        {provide: Title, useValue: titleSpy}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaRoomsDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should set the title of the header and the title of the page '
     + 'at initialization',
     () => {
       fixture.detectChanges();
       const title: HTMLElement = fixture.nativeElement
         .querySelector('.container > span').getAttribute('pageTitle');
       const headerTitleSpy = fixture.debugElement.injector
         .get(RaHeaderTitleService) as jasmine.SpyObj<RaHeaderTitleService>;
       const titleSpy = fixture.debugElement.injector
         .get(Title) as jasmine.SpyObj<Title>;

       expect(headerTitleSpy.setTitle).toHaveBeenCalledTimes(1);
       expect(headerTitleSpy.setTitle).toHaveBeenCalledWith(title);
       expect(titleSpy.setTitle).toHaveBeenCalledTimes(1);
       expect(titleSpy.setTitle).toHaveBeenCalledWith(title);
     });

  it('should fetch the room at initialization', () => {
    const roomStub: any = {_id: 'roomid'};
    const apiSpy = fixture.debugElement.injector
      .get(RaApiService) as jasmine.SpyObj<RaApiService>;
    apiSpy.getRoomById$.and.returnValue(of(roomStub));

    fixture.detectChanges();

    const room = fixture.nativeElement
      .querySelector('ra-room');

    expect(room).toBeTruthy();

    expect(apiSpy.getRoomById$).toHaveBeenCalledTimes(1);
    expect(apiSpy.getRoomById$).toHaveBeenCalledWith(roomStub._id);

    expect(component.room).toEqual(roomStub);
    expect(component.loading).toBe(false);
    expect(component.error).toBe(false);
  });

  it('should display an error message when the room '
     + 'fetch fails', () => {
       const apiSpy = fixture.debugElement.injector
         .get(RaApiService) as jasmine.SpyObj<RaApiService>;
       apiSpy.getRoomById$.and.returnValue(throwError('error'));

       fixture.detectChanges();

       const error = fixture.nativeElement
         .querySelector('ra-message-panel');

       expect(error).toBeTruthy();
       expect(error.textContent).toBeTruthy();

       expect(component.loading).toBe(false);
       expect(component.error).toBe(true);
     });

  it('#loading should show/hide spinner', () => {
    // setup, boilerplate
    const roomStub: any = {_id: 'roomid'};
    const apiSpy = fixture.debugElement.injector
      .get(RaApiService) as jasmine.SpyObj<RaApiService>;
    apiSpy.getRoomById$.and.returnValue(of(roomStub));

    fixture.detectChanges();

    let spinner = fixture.nativeElement
      .querySelector('mat-spinner');
    expect(spinner).toBeFalsy();

    expect(component.loading).toBe(false);
    expect(component.error).toBe(false);

    component.loading = true;
    fixture.detectChanges();

    spinner = fixture.nativeElement
      .querySelector('mat-spinner');
    expect(spinner).toBeTruthy();
  });

});
