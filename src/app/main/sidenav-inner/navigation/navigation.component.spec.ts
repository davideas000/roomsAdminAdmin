import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RaNavigationComponent } from './navigation.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RaApiService } from 'src/app/api.service';
import { of } from 'rxjs';

describe('RaNavigationComponent', () => {
  let component: RaNavigationComponent;
  let fixture: ComponentFixture<RaNavigationComponent>;

  beforeEach(async(() => {
    const apiSpy = jasmine.createSpyObj(
      'RaApiService',
      ['getPendingReservationsCount$',
       'getPendingReservationsCountByDep$']);
    TestBed.configureTestingModule({
      declarations: [ RaNavigationComponent ],
      providers: [{provide: RaApiService, useValue: apiSpy}],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaNavigationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch number of pending reservations at startup',
     fakeAsync(() => {
       const pendingReservsCountStub = 10;
       const pendingReservsCountByDepStub = 8;
       const apiSpy = fixture.debugElement.injector
         .get(RaApiService) as jasmine.SpyObj<RaApiService>;
       apiSpy.getPendingReservationsCount$.and
         .returnValue(of(pendingReservsCountStub));
       apiSpy.getPendingReservationsCountByDep$.and
         .returnValue(of(pendingReservsCountByDepStub));

       component.showDepNav = true;

       fixture.detectChanges();
       tick(0);
       fixture.detectChanges();

       const pendingCountEl: HTMLElement = fixture.nativeElement
         .querySelector('.count');

       expect(pendingCountEl.textContent)
         .toBe(pendingReservsCountStub.toString());

       expect(component.numberOfPendingReservations)
         .toBe(pendingReservsCountStub);

       // number of pending reservations of the department
       const pendingCountByDepEl: HTMLElement = fixture.nativeElement
         .querySelector('.countdep:last-child');

       expect(pendingCountByDepEl.textContent)
         .toBe(pendingReservsCountByDepStub.toString());

       expect(component.numberOfPendingReservationsDep)
         .toBe(pendingReservsCountByDepStub);

       component.ngOnDestroy();
       tick(20000);
     }));

  it('#showDepNav should show/hide the part of the menu '
     + 'related to the department',
     fakeAsync(() => {
       const pendingReservsCountStub = 10;
       const pendingReservsCountByDepStub = 8;
       const apiSpy = fixture.debugElement.injector
         .get(RaApiService) as jasmine.SpyObj<RaApiService>;
       apiSpy.getPendingReservationsCount$.and
         .returnValue(of(pendingReservsCountStub));
       apiSpy.getPendingReservationsCountByDep$.and
         .returnValue(of(pendingReservsCountByDepStub));

       fixture.detectChanges();
       tick(0);
       fixture.detectChanges();

       // default to false
       let nav: NodeList = fixture.nativeElement
         .querySelectorAll('mat-list-item');

       expect(component.showDepNav).toBe(false);
       expect(nav.length).toBe(3);

       component.showDepNav = true;
       fixture.detectChanges();

       // case true
       nav = fixture.nativeElement
         .querySelectorAll('mat-list-item');

       expect(component.showDepNav).toBe(true);
       expect(nav.length).toBe(5);

       component.ngOnDestroy();
       tick(20000);
     }));
});
