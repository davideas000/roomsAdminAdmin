import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaRoomsListComponent } from './rooms-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RaRoomsListComponent', () => {
  let component: RaRoomsListComponent;
  let fixture: ComponentFixture<RaRoomsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaRoomsListComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaRoomsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list of rooms', () => {
    const roomsStub: any[] = [
      {_id: 'roomid1' },
      {_id: 'roomid2' },
      {_id: 'roomid3' },
      {_id: 'roomid4' }
    ];

    component.rooms = roomsStub;

    fixture.detectChanges();

    const rooms: NodeList = fixture.nativeElement
      .querySelectorAll('ra-room');

    expect(rooms.length).toBe(roomsStub.length);
  });

  it('#compact should toggle on/off `compact` CSS class on ' +
     'the ul element', () => {
       // default to false
       let ulEl: HTMLElement = fixture.nativeElement
         .querySelector('ul.compact');
       expect(ulEl).toBeFalsy();

       // case true
       component.compact = true;
       fixture.detectChanges();

       ulEl = fixture.nativeElement
         .querySelector('ul.compact');
       expect(ulEl).toBeTruthy();
     });

  it('should display a message when the list of rooms is empty',
     () => {
       component.rooms = [];
       fixture.detectChanges();
       const msg: HTMLElement = fixture.nativeElement
         .querySelector('p');

       expect(msg).toBeTruthy();
       expect(msg.textContent).toBeTruthy();
     });
});
