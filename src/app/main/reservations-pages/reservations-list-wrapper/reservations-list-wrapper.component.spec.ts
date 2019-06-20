import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaReservationsListWrapperComponent } from './reservations-list-wrapper.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RaReservationsListWrapperComponent', () => {
  let component: RaReservationsListWrapperComponent;
  let fixture: ComponentFixture<RaReservationsListWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaReservationsListWrapperComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaReservationsListWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#listType should define which (listType) button '
     + 'to display', () => {
       // there are two buttons to change the type of list,
       // the only difference between them is the tooltip and the icon

       // default to grid
       expect(component.listType).toBe('grid');
       let buttonIcon: HTMLElement = fixture.nativeElement
         .querySelector('ra-rooms-search mat-icon');

       expect(buttonIcon.textContent).toBe('view_list');

       component.listType = 'list';
       fixture.detectChanges();

       expect(component.listType).toBe('list');
       buttonIcon = fixture.nativeElement
         .querySelector('ra-rooms-search mat-icon');

       expect(buttonIcon.textContent).toBe('view_module');
     });

  it('button{view_module or view_list} should toggle #listType',
     () => {
       // default to grid
       expect(component.listType).toBe('grid');

       let listTypeToggle: HTMLButtonElement = fixture.nativeElement
         .querySelector('ra-rooms-search button');

       // change to list
       listTypeToggle.dispatchEvent(new Event('click'));
       fixture.detectChanges();

       expect(component.listType).toBe('list');

       listTypeToggle = fixture.nativeElement
         .querySelector('ra-rooms-search button');

       // change to list
       listTypeToggle.dispatchEvent(new Event('click'));

       expect(component.listType).toBe('grid');
     });

  it('#reservations property should set #reservationsAll, '
     + '#deps and #roomTypes', () => {
       const depsStub: any = [
         {_id: 'dep01', acronym: 'DOP'},
         {_id: 'dep02', acronym: 'DUP'}
       ];
       const roomTypesStub: any = ['sala', 'lab'];
       const reservsStub: any = [
         {
           _id: 'reser001',
           room: {
             type: roomTypesStub[0],
             department: depsStub[0]
           }
         },
         {
           _id: 'reser002',
           room: {
             type: roomTypesStub[1],
             department: depsStub[1]
           }
         },
         {
           _id: 'reser003',
           room: {
             type: roomTypesStub[0],
             department: depsStub[0]
           }
         }
       ];

       component.reservations = reservsStub;

       expect(component.reservations).toEqual(reservsStub);

       expect(component.roomTypes.size).toBe(2);
       expect(component.roomTypes.has(roomTypesStub[0])).toBe(true);
       expect(component.roomTypes.has(roomTypesStub[1])).toBe(true);

       expect(component.deps.size).toBe(2);
       expect(component.deps.has(depsStub[0].acronym)).toBe(true);
       expect(component.deps.has(depsStub[1].acronym)).toBe(true);
     });

  it('#onSearch() should filter #reservations array', () => {
       const depsStub: any = [
         {_id: 'dep01', acronym: 'DOP'},
         {_id: 'dep02', acronym: 'DUP'}
       ];
       const roomTypesStub: any = ['sala', 'lab'];
       const reservsStub: any = [
         {
           _id: 'reserv001',
           room: {
             name: 'sala 101',
             type: roomTypesStub[0],
             department: depsStub[0]
           }
         },
         {
           _id: 'reserv002',
           room: {
             name: 'lab A',
             type: roomTypesStub[1],
             department: depsStub[1]
           }
         },
         {
           _id: 'reserv003',
           room: {
             name: 'lab B',
             type: roomTypesStub[1],
             department: depsStub[1]
           }
         },
         {
           _id: 'reserv004',
           room: {
             name: 'lab C',
             type: roomTypesStub[0],
             department: depsStub[1]
           }
         },
         {
           _id: 'reserv005',
           room: {
             name: 'audi 02',
             type: roomTypesStub[0],
             department: depsStub[0]
           }
         }
       ];

       component.reservations = reservsStub;

       component.onSearch({
         name: 'lab',
         department: 'dep02',
         type: 'lab'
       });

       expect(component.reservations.length).toBe(2);
       expect(component.reservations[0]._id).toBe('reserv002');
       expect(component.reservations[1]._id).toBe('reserv003');
     });

  it('#searching should show/hide spinner', () => {
    // default to false
    expect(component.searching).toBe(false);

    let spinner: HTMLElement = fixture.nativeElement
      .querySelector('mat-spinner');

    expect(spinner).toBeFalsy();

    component.searching = true;
    fixture.detectChanges();

    spinner = fixture.nativeElement
      .querySelector('mat-spinner');

    expect(spinner).toBeTruthy();
  });

});
