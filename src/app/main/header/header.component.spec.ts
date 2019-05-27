import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaHeaderComponent } from './header.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { RaResponsiveService } from 'src/app/responsive.service';
import { RaHeaderTitleService } from './header-title.service';
import { of, ReplaySubject } from 'rxjs';

describe('RaHeaderComponent', () => {
  let component: RaHeaderComponent;
  let fixture: ComponentFixture<RaHeaderComponent>;
  let dumbTitle = 'dumb title';

  beforeEach(async(() => {
    const locationSpy = jasmine.createSpyObj('Location', ['back']);
    const headerTitleSpy = jasmine
      .createSpyObj('RaHeaderTitleService', ['']);
    // this is necessary to avoid error at initialization
    headerTitleSpy.headerTitle$ = of(dumbTitle) as ReplaySubject<string>;
    const responsiveSpy = jasmine.createSpyObj(
      'RaResponsiveService', ['isActive']);
    TestBed.configureTestingModule({
      declarations: [ RaHeaderComponent ],
      providers: [
        {provide: Location, useValue: locationSpy},
        {provide: RaHeaderTitleService, useValue: headerTitleSpy},
        {provide: RaResponsiveService, useValue: responsiveSpy}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get title on initialization', () => {
    const titleEl: HTMLElement = fixture.nativeElement
      .querySelector('h1.title');

    expect(titleEl).toBeTruthy();
    expect(titleEl.textContent).toBe(dumbTitle);
  });

  it('#backButton should show/hide `back button', () => {
    // default to false

    // case false
    component.showBackButton = false;
    fixture.detectChanges();
    let backButtonEl: HTMLElement = fixture.nativeElement
      .querySelector('.left-side .backbutton');

    expect(backButtonEl).toBeFalsy();
    expect(component.showBackButton).toBeFalsy();

    // case true
    component.showBackButton = true;
    fixture.detectChanges();
    backButtonEl = fixture.nativeElement
      .querySelector('.left-side .backbutton');
    expect(backButtonEl).toBeTruthy();
  });

  it('button.backbutton should navigate the user to the previous page '
     + 'when clicked',
     () => {
       component.showBackButton = true;
       fixture.detectChanges();

       const backButton: HTMLButtonElement = fixture.nativeElement
         .querySelector('button.backbutton');

       backButton.dispatchEvent(new Event('click'));

       const locationSpy = fixture.debugElement.injector
         .get(Location) as jasmine.SpyObj<Location>;

       expect(locationSpy.back).toHaveBeenCalledTimes(1);
     });

  it('should show menu button', () => {
    const menuButton: HTMLElement = fixture.nativeElement
      .querySelector('button:not(.backbutton)');

    expect(menuButton).toBeTruthy();
  });

  it('should raise a `menuButtonClick` event when the menu button is '
     + 'clicked', () => {
       let evResult: boolean = false;
       component.menuButtonClick.subscribe(_ => evResult = true);

       const menuButtonEl: HTMLButtonElement = fixture.nativeElement
         .querySelector('.left-side button');

       menuButtonEl.dispatchEvent(new Event('click'));

       expect(evResult).toBe(true);
     });

  it('#showNotificationsIcon hide/show notifications panel',
     () => {
       // default to true
       let notificationPanelEl: HTMLElement = fixture.nativeElement
         .querySelector('ra-notifications-panel');

       expect(notificationPanelEl).toBeTruthy();

       // case false
       component.showNotificationsIcon = false;
       fixture.detectChanges();

       notificationPanelEl = fixture.nativeElement
         .querySelector('ra-notifications-panel');
       expect(notificationPanelEl).toBeFalsy();
     });

  it('should show `<ra-user-menu>` when media !== `xs`', () => {
    const responsiveSpy = fixture.debugElement.injector
      .get(RaResponsiveService) as jasmine.SpyObj<RaResponsiveService>;
    responsiveSpy.isActive.and.returnValue(false);
    fixture.detectChanges();

    const userMenuEl: HTMLElement = fixture.nativeElement
      .querySelector('ra-user-menu');

    expect(userMenuEl).toBeTruthy();
  });

  // search button for mobile users
  it('should show `<ra-mobile-search>` when media === `xs`', () => {
    const responsiveSpy = fixture.debugElement.injector
      .get(RaResponsiveService) as jasmine.SpyObj<RaResponsiveService>;
    responsiveSpy.isActive.and.returnValue(true);
    fixture.detectChanges();

    const mobileSearchEl: HTMLElement = fixture.nativeElement
      .querySelector('ra-mobile-search');

    expect(mobileSearchEl).toBeTruthy();
  });

});
