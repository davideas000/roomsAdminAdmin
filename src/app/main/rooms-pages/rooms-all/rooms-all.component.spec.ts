import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaRoomsAllComponent } from './rooms-all.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RaApiService } from 'src/app/api.service';

import { of, throwError } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { RaHeaderTitleService } from '../../header/header-title.service';

describe('RaRoomsAllComponent', () => {
  let component: RaRoomsAllComponent;
  let fixture: ComponentFixture<RaRoomsAllComponent>;

  let roomDepsStub: any = [
    {_id: 'dep01', acronym: 'dep1'},
    {_id: 'dep02', acronym: 'dep2'},
    {_id: 'dep03', acronym: 'dep3'}
  ];

  let roomTypesStub = [
    'roomtype 1',
    'roomtype 2',
    'roomtype 3'
  ];

  let roomsStub: any = [
    {
      _id: 'id01',
      type: roomTypesStub[0],
      department: roomDepsStub[0]
    },
    {
      _id: 'id01',
      type: roomTypesStub[1],
      department: roomDepsStub[1]
    },
    {
      _id: 'id01',
      type: roomTypesStub[2],
      department: [2]
    },
    {
      _id: 'id01',
      type: roomTypesStub[0],
      department: roomDepsStub[0]
    }
  ];

  beforeEach(async(() => {
    const apiSpy = jasmine.createSpyObj('RaApiService',
                                        ['roomSearch$']);
    apiSpy.roomSearch$.and.returnValue(of(roomsStub));
    const headerTitleSpy = jasmine.createSpyObj('RaHeaderTitleService',
                                                ['setTitle']);
    const titleSpy = jasmine.createSpyObj('Title',
                                          ['setTitle']);
    TestBed.configureTestingModule({
      declarations: [ RaRoomsAllComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        {provide: RaApiService, useValue: apiSpy},
        {provide: RaHeaderTitleService, useValue: headerTitleSpy},
        {provide: Title, useValue: titleSpy},
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaRoomsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#loading should hide/show the spinner', () => {
    component.loading = true;
    fixture.detectChanges();
    let spinner = fixture.nativeElement
      .querySelector('mat-spinner');
    expect(spinner).toBeTruthy();

    component.loading = false;
    fixture.detectChanges();
    spinner = fixture.nativeElement
      .querySelector('mat-spinner');
    expect(spinner).toBeFalsy();
  });

  it('should set the title of the page and the title of the header '
     + 'at startup', () => {
       const titleSpy = fixture.debugElement.injector
         .get(Title) as jasmine.SpyObj<Title>;
       const headerTitleSpy = fixture.debugElement.injector
         .get(RaHeaderTitleService) as jasmine.SpyObj<RaHeaderTitleService>;

       const pageTitle = fixture.nativeElement.
         querySelector('[pageTitle]').getAttribute('pageTitle');

       expect(titleSpy.setTitle).toHaveBeenCalledTimes(1);
       expect(titleSpy.setTitle).toHaveBeenCalledWith(pageTitle);

       expect(headerTitleSpy.setTitle).toHaveBeenCalledTimes(1);
       expect(headerTitleSpy.setTitle).toHaveBeenCalledWith(pageTitle);
     });

  it('should fetch the rooms at startup', () => {
    const apiSpy = fixture.debugElement.injector
      .get(RaApiService) as jasmine.SpyObj<RaApiService>;

    expect(apiSpy.roomSearch$).toHaveBeenCalledTimes(1);
    expect(apiSpy.roomSearch$).toHaveBeenCalledWith(null);
    expect(component.rooms).toEqual(roomsStub);
    expect(component.loading).toBe(false);
  });

  it('should display an error message when the room fetch fails',
     () => {
       const apiSpy = fixture.debugElement.injector
         .get(RaApiService) as jasmine.SpyObj<RaApiService>;

       apiSpy.roomSearch$.and.returnValue(throwError('error'));

       // trigger search
       component.search$.next(null);
       fixture.detectChanges();

       const errorMsg: HTMLElement = fixture.nativeElement
         .querySelector('ra-message-panel');

       expect(errorMsg).toBeTruthy();
       expect(errorMsg.textContent).toBeTruthy();

       expect(apiSpy.roomSearch$).toHaveBeenCalled();
       expect(apiSpy.roomSearch$).toHaveBeenCalledWith(null);
       expect(component.loading).toBe(false);
       expect(component.error).toBe(true);
     });

  it('should get the types and departments of the rooms '
     + 'at startup', () => {
       expect(component.roomTypes.size).toBe(roomTypesStub.length);
       expect(component.roomTypes.has(roomTypesStub[0])).toBe(true);
       expect(component.roomDeps.size).toEqual(roomDepsStub.length);
       expect(component.roomDeps.has(roomDepsStub[0].acronym)).toBe(true);
     });

  it('should toggle on/off compact room list when '
     + 'button{view_module or view_comfy} is clicked', () => {
       // default to false
       expect(component.compactRoomsList).toBe(false);

       let toggleListModeBtn: HTMLButtonElement = fixture.nativeElement
         .querySelector('.list-type-btn-wrapper button');

       toggleListModeBtn.dispatchEvent(new Event('click'));

       let compRoomListLocalStorage = localStorage
         .getItem('compactRoomsList') === 'true';

       expect(compRoomListLocalStorage).toBe(true);
       expect(component.compactRoomsList).toBe(true);

       toggleListModeBtn = fixture.nativeElement
         .querySelector('.list-type-btn-wrapper button');

       toggleListModeBtn.dispatchEvent(new Event('click'));

       compRoomListLocalStorage = localStorage
         .getItem('compactRoomsList') === 'true';

       expect(compRoomListLocalStorage).toBe(false);
       expect(component.compactRoomsList).toBe(false);
     });

  it('#searchRoom() should trigger the search of rooms', () => {
    const apiSpy = fixture.debugElement.injector
      .get(RaApiService) as jasmine.SpyObj<RaApiService>;

    const searchParameters = {name: 'roomstub'};

    component.searchRoom(searchParameters);

    expect(apiSpy.roomSearch$).toHaveBeenCalled();
    expect(apiSpy.roomSearch$).toHaveBeenCalledWith(searchParameters);
    expect(component.searching).toBe(false);
  });

  it('#searching should show/hide the searching spinner', () => {
    // default to false
    expect(component.searching).toBe(false);
    let spinner = fixture.nativeElement
      .querySelector('mat-spinner');
    expect(spinner).toBeFalsy();

    component.searching = true;
    fixture.detectChanges();

    spinner = fixture.nativeElement
      .querySelector('mat-spinner');
    expect(spinner).toBeTruthy();
  });
});
