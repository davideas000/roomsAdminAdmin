import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaNotificationsDetailsComponent } from './notifications-details.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RaApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';

import { of } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { RaHeaderTitleService } from '../../header/header-title.service';

describe('RaNotificationsDetailsComponent', () => {
  let component: RaNotificationsDetailsComponent;
  let fixture: ComponentFixture<RaNotificationsDetailsComponent>;

  const notificationIdStub = 'notifiid001';
  const notificationStub: any = {_id: 'notifi0001'};

  beforeEach(async(() => {
    const apiSpy = jasmine.createSpyObj('RaApiService',
                                        ['getNotificationById$']);
    apiSpy.getNotificationById$.and.returnValue(of(notificationStub));
    const routeSpy = jasmine.createSpyObj('ActivatedRoute', ['']);
    const titleSpy = jasmine.createSpyObj('Title', ['setTitle']);
    const headerTitleSpy = jasmine.createSpyObj('RaHeaderTitle',
                                                ['setTitle']);
    routeSpy.paramMap = of({get: () => notificationIdStub});
    TestBed.configureTestingModule({
      declarations: [ RaNotificationsDetailsComponent ],
      providers: [
        {provide: RaApiService, useValue: apiSpy},
        {provide: ActivatedRoute, useValue: routeSpy},
        {provide: Title, useValue: titleSpy},
        {provide: RaHeaderTitleService, useValue: headerTitleSpy}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaNotificationsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch the notification at startup', () => {
    const apiSpy = fixture.debugElement.injector
      .get(RaApiService) as jasmine.SpyObj<RaApiService>;

    expect(apiSpy.getNotificationById$).toHaveBeenCalledTimes(1);
    expect(apiSpy.getNotificationById$)
      .toHaveBeenCalledWith(notificationIdStub);
    expect(component.notification).toEqual(notificationStub);
    expect(component.loading).toBe(false);
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

  it('should display `notification.extra` when there is one', () => {
    component.notification = {_id: 'nofiid'} as any;
    fixture.detectChanges();

    let notifEl: HTMLElement = fixture.nativeElement
      .querySelector('.ra-notifications-details-extra');
    expect(notifEl).toBeFalsy();

    component.notification = {_id: 'nofiid',
                              extra: 'extra message'} as any;
    fixture.detectChanges();

    notifEl = fixture.nativeElement
      .querySelector('.ra-notifications-details-extra');
    expect(notifEl).toBeTruthy();
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
