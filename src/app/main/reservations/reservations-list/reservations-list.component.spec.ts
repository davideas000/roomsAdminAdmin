import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaReservationsListComponent } from './reservations-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RaReservationsListComponent', () => {
  let component: RaReservationsListComponent;
  let fixture: ComponentFixture<RaReservationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaReservationsListComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
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
    let reservationsStub = [
      {_id: '001'}, {_id: '002'}, {_id: '003'}, {_id: '004'}
    ];
    component.reservations = reservationsStub;
    fixture.detectChanges();

    const reservs: NodeList = fixture.nativeElement
      .querySelectorAll('ra-reservation');

    expect(reservs.length).toBe(reservationsStub.length);
  });

});
