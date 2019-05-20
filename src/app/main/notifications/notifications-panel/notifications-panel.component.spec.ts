import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RaNotificationsPanelComponent } from './notifications-panel.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { RaApiService } from 'src/app/api.service';
import { RaNotification, RaNotificationStatus, RaNotificationCategory } from 'src/app/models/notification.model';
import { of, throwError } from 'rxjs';

@Component({selector: 'ra-overlay-panel',
            template: '<ng-content></ng-content>'})
class FakeOverlayPanel {}

describe('RaNotificationsPanelComponent', () => {
  let component: RaNotificationsPanelComponent;
  let fixture: ComponentFixture<RaNotificationsPanelComponent>;

  const notificationsMock: RaNotification[] = [
    { // 1
      _id: '001',
      message: 'mmmm mmmm mmmm mmm',
      status: RaNotificationStatus.read,
      category: RaNotificationCategory.approvedReservation,
      createdAt: new Date('2019-01-01T02:00:00')
    },
    { // 2
      _id: '002',
      message: 'nnnnn 333m 333m 333',
      status: RaNotificationStatus.unread,
      category: RaNotificationCategory.removedReservation,
      createdAt: new Date('2019-01-01T02:00:00')
    },
    { // 3
      _id: '003',
      message: 'kkkkn kkkk kkkk kkkk',
      status: RaNotificationStatus.unread,
      category: RaNotificationCategory.rejectedReservation,
      createdAt: new Date('2019-01-01T02:00:00')
    },
    { // 4
      _id: '001',
      message: 'mmmm mmmm mmmm mmm',
      status: RaNotificationStatus.unread,
      category: RaNotificationCategory.approvedReservation,
      createdAt: new Date('2019-01-01T02:00:00')
    },
    { // 5
      _id: '002',
      message: 'nnnnn 333m 333m 333',
      status: RaNotificationStatus.unread,
      category: RaNotificationCategory.removedReservation,
      createdAt: new Date()
    },
    { // 6
      _id: '003',
      message: 'kkkkn kkkk kkkk kkkk',
      status: RaNotificationStatus.unread,
      category: RaNotificationCategory.rejectedReservation,
      createdAt: new Date('2019-04-01T02:00:00')
    }
  ];

  beforeEach(async(() => {
    const apiSpy = jasmine.createSpyObj(
      'RaApiService', ['getNotifications$', 'markNotificationsAsRead$']
    );
    apiSpy.getNotifications$.and.returnValue(of(notificationsMock));
    TestBed.configureTestingModule({
      declarations: [ RaNotificationsPanelComponent, FakeOverlayPanel ],
      // imports: [ SharedModule ],
      providers: [{provide: RaApiService, useValue: apiSpy}],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaNotificationsPanelComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetch notifications on initialization',
     fakeAsync(() => {
       fixture.detectChanges();
       tick(0);
       fixture.detectChanges();

       const apiSpy = fixture.debugElement.injector
         .get(RaApiService) as jasmine.SpyObj<RaApiService>;
       expect(apiSpy.getNotifications$).toHaveBeenCalledTimes(1);
       expect(component.notifications).toEqual(notificationsMock);

       // *template*
       const notificationEls: NodeList = fixture.nativeElement
         .querySelectorAll('ra-notification');

       expect(notificationEls.length).toBe(notificationsMock.length);

       // kill timer
       component.alive = false;
       tick(1200000);
     }));

  it('should display a link to all-notifications page',
     fakeAsync(() => {
       fixture.detectChanges();
       tick(0);
       fixture.detectChanges();

       const link: HTMLElement = fixture.nativeElement
         .querySelector('li a.center-text');

       expect(link).toBeTruthy();
       expect(link.textContent).toBeTruthy();

       // kill timer
       component.alive = false;
       tick(12000000);
     }));

  it('should show an error message when notifications fetching '
     + 'fails', fakeAsync(() =>{
       const apiSpy = fixture.debugElement.injector
         .get(RaApiService) as jasmine.SpyObj<RaApiService>;
       apiSpy.getNotifications$.and.returnValue(throwError('error'));

       fixture.detectChanges();
       tick(0);
       fixture.detectChanges();

       const errorMsg: HTMLElement = fixture.nativeElement
         .querySelector('ra-message-panel');
       expect(errorMsg).toBeTruthy();
       expect(errorMsg.textContent).toBeTruthy();

       // kill timer
       component.alive = false;
       tick(12000000);
     }));

  it('should display a message when number of notifications is 0',
     fakeAsync(() =>{
       const apiSpy = fixture.debugElement.injector
         .get(RaApiService) as jasmine.SpyObj<RaApiService>;
       apiSpy.getNotifications$.and.returnValue(of([]));

       fixture.detectChanges();
       tick(0);
       fixture.detectChanges();


       const msg: HTMLElement = fixture.nativeElement
         .querySelector('p.center-text');

       expect(msg).toBeTruthy();
       expect(msg.textContent).toBeTruthy();

       // kill timer
       component.alive = false;
       tick(12000000);
     }));

  it('should set #numUnreadNotifications on initialization',
     fakeAsync(() => {
       fixture.detectChanges();
       tick(0);

       // see notificationsMock
       expect(component.numUnreadNotifications).toBe(5);

       // kill timer
       component.alive = false;
       tick(12000000);
     }));

  it('notifications toggle button should call '
     + '`apiService.markNotificationsAsRead()$`',
     fakeAsync(() => {
       fixture.detectChanges();
       tick(0);
       fixture.detectChanges();

       const apiSpy = fixture.debugElement.injector
         .get(RaApiService) as jasmine.SpyObj<RaApiService>;
       apiSpy.markNotificationsAsRead$.and.returnValue(of("doesn't matter"));

       const openPanelBtn: HTMLButtonElement = fixture.nativeElement
         .querySelector('button');

       openPanelBtn.dispatchEvent(new Event('click'));

       expect(apiSpy.markNotificationsAsRead$).toHaveBeenCalledTimes(1);
       expect(component.numUnreadNotifications).toBe(0);

       // kill timer
       component.alive = false;
       tick(12000000);
     }));

  it('should display an error message when '
     + '`apiService.markNotificationsAsRead()$` ',
     fakeAsync(() => {
       fixture.detectChanges();
       tick(0);
       fixture.detectChanges();

       const apiSpy = fixture.debugElement.injector
         .get(RaApiService) as jasmine.SpyObj<RaApiService>;
       apiSpy.markNotificationsAsRead$.and
         .returnValue(throwError('error'));

       component.markNotificationsAsRead();
       fixture.detectChanges();

       const errorMsgEl: HTMLElement = fixture.nativeElement
         .querySelector('ra-message-panel');

       expect(apiSpy.markNotificationsAsRead$).toHaveBeenCalledTimes(1);
       expect(component.error).toBe(true);

       expect(errorMsgEl).toBeTruthy();
       expect(errorMsgEl.textContent).toBeTruthy();

       // kill timer
       component.alive = false;
       tick(12000000);
     }));

});
