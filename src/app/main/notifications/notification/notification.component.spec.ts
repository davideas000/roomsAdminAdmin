import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationComponent } from './notification.component';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RaNotificationStatus, RaNotificationCategory } from 'src/app/models/notification.model';

@Component({selector: 'mat-icon', template: ''})
class FakeMatIconComponent {}

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationComponent, FakeMatIconComponent ],
      imports: [ SharedModule ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display notification\'s message and creation date', () => {
    const notificationStub = {
      _id: 'notificationid',
      message: 'notification message',
      status: RaNotificationStatus.unread,
      category: RaNotificationCategory.approvedReservation,
      createdAt: new Date()
    };

    component.notification = notificationStub;

    fixture.detectChanges();

    const messageEl: HTMLElement = fixture.nativeElement
      .querySelector('.message span');
    expect(messageEl).toBeTruthy();
    expect(messageEl.textContent).toBe(notificationStub.message);

    const dateEl: HTMLElement = fixture.nativeElement
      .querySelector('.ra-notification-date');
    expect(dateEl).toBeTruthy();
    expect(dateEl.textContent).toBeTruthy();

  });

  it('should show a different icon depending on `#reservation.category`',
     () =>{
       const notificationStub = {
         _id: 'notificationid',
         message: 'notification message',
         status: RaNotificationStatus.unread,
         category: RaNotificationCategory.approvedReservation,
         createdAt: new Date()
       };
       component.notification = notificationStub;

       fixture.detectChanges();

       // case #notification.category === 'approved-reservation'
       let iconEl: HTMLElement = fixture.nativeElement
         .querySelector('mat-icon');
       expect(iconEl.classList.contains('ra-notification-approved'))
         .toBeTruthy();

       // case #notification.category === 'removed-reservation'
       component.notification.category = RaNotificationCategory.removedReservation;
       fixture.detectChanges();
       iconEl = fixture.nativeElement.querySelector('mat-icon');
       expect(iconEl.classList.contains('ra-notification-removed'))
         .toBeTruthy();

       // case #notification.category === 'rejected-reservation'
       component.notification.category = RaNotificationCategory.rejectedReservation;
       fixture.detectChanges();
       iconEl = fixture.nativeElement.querySelector('mat-icon');
       expect(iconEl.classList.contains('ra-notification-rejected'))
         .toBeTruthy();
     });
});
