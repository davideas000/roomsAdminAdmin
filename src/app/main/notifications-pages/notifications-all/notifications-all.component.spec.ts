import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaNotificationsAllComponent } from './notifications-all.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { RaApiService } from 'src/app/api.service';
import { RaHeaderTitleService } from '../../header/header-title.service';

describe('RaNotificationsAllComponent', () => {
  let component: RaNotificationsAllComponent;
  let fixture: ComponentFixture<RaNotificationsAllComponent>;

  const notificationsStub: any = [
    {_id: 'noti001'},
    {_id: 'notif002'},
    {_id: 'noti001'},
    {_id: 'notif002'}
  ];

  beforeEach(async(() => {
    const apiSpy = jasmine.createSpyObj('RaApiService',
                                        ['getNotifications$']);
    apiSpy.getNotifications$.and.returnValue(of(notificationsStub));
    const routeSpy = jasmine.createSpyObj('ActivatedRoute', ['']);
    const titleSpy = jasmine.createSpyObj('Title', ['setTitle']);
    const headerTitleSpy = jasmine.createSpyObj('RaHeaderTitle',
                                                ['setTitle']);
    TestBed.configureTestingModule({
      declarations: [ RaNotificationsAllComponent ],
      providers: [
        {provide: RaApiService, useValue: apiSpy},
        {provide: Title, useValue: titleSpy},
        {provide: RaHeaderTitleService, useValue: headerTitleSpy}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaNotificationsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch the notifications at startup', () => {
    const apiSpy = fixture.debugElement.injector
      .get(RaApiService) as jasmine.SpyObj<RaApiService>;

    expect(apiSpy.getNotifications$).toHaveBeenCalledTimes(1);
    expect(component.notifications).toEqual(notificationsStub);
    expect(component.loading).toBe(false);

    // check whether the notifications are being displayed
    // in the template
    const notifs: NodeList = fixture.nativeElement
      .querySelectorAll('.notifications-list ra-notification');

    expect(notifs.length).toBe(notificationsStub.length);
  });

  it('#loading should show/hide the spinner', () => {

    expect(component.loading).toBe(false);

    let spinner: HTMLElement = fixture.nativeElement
      .querySelector('mat-spinner');
    expect(spinner).toBeFalsy();

    component.loading = true;
    fixture.detectChanges();

    spinner = fixture.nativeElement
      .querySelector('mat-spinner');
    expect(spinner).toBeTruthy();

  });

  it('#error should show/hide the error message', () => {
    expect(component.error).toBe(false);

    let errorMsg: HTMLElement = fixture.nativeElement
      .querySelector('ra-message-penal');
    expect(errorMsg).toBeFalsy();

    component.error = true;
    fixture.detectChanges();

    errorMsg = fixture.nativeElement
      .querySelector('ra-message-panel');
    expect(errorMsg).toBeTruthy();
    expect(errorMsg.textContent).toBeTruthy();
  });

  it('should display a message when the list is empty', () => {
    component.notifications = [];
    fixture.detectChanges();

    const msg = fixture.nativeElement
      .querySelector('.ra-notifications-all-empty-msg');

    expect(msg).toBeTruthy();
    expect(msg.textContent).toBeTruthy();
  });

  it('should get the title of the page from the template', () => {
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
});
