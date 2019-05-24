import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaRoomComponent } from './room.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RaRoomComponent', () => {
  let component: RaRoomComponent;
  let fixture: ComponentFixture<RaRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaRoomComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display info of the room', () => {
    const roomStub = {
      _id: 'roomid',
      name: 'roomname',
      description: 'room desc',
      type: 'roomtype',
      department: {acronym: 'dep1'} as any,
      photos: [],
      width: 100,
      length: 1,
      capacity: 12
    }

    component.room = roomStub;
    fixture.detectChanges();

    const roomNameEl: HTMLElement = fixture.nativeElement
      .querySelector('mat-card-title');
    const roomTypeDepEl: HTMLElement = fixture.nativeElement
      .querySelector('mat-card-subtitle');
    const roomDescEl: HTMLElement = fixture.nativeElement
      .querySelector('.description');
    const roomInfo: NodeList = fixture.nativeElement
      .querySelectorAll('.info .label + span');

    expect(roomNameEl.textContent).toBe(roomStub.name);
    expect(roomTypeDepEl.textContent).toBe(
      `${roomStub.type} - ${roomStub.department.acronym}`
    );
    expect(roomDescEl.textContent).toBe(roomStub.description);
    expect(roomInfo.length).toBe(3);
    expect(roomInfo[0].textContent).toBe(`${roomStub.width} metros`);
    expect(roomInfo[1].textContent).toBe(`${roomStub.length} metros`);
    expect(roomInfo[2].textContent).toBe(`${roomStub.capacity} pessoas`);
  });

});
