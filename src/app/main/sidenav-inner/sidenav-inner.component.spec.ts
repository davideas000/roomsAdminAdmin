import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaSidenavInnerComponent } from './sidenav-inner.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { of } from 'rxjs';
import { RaAuthService } from 'src/app/auth/auth.service';
import { RaResponsiveService } from 'src/app/responsive.service';

describe('RaSidenavInnerComponent', () => {
  let component: RaSidenavInnerComponent;
  let fixture: ComponentFixture<RaSidenavInnerComponent>;
  const userStub: any = {_id: 'userid', type: 'resp'};

  beforeEach(async(() => {
    const authSpy = jasmine.createSpyObj('RaAuthService', ['']);
    const resSpy = jasmine.createSpyObj('RaResponsive', ['isActive']);
    authSpy.profile$ = of(userStub);
    TestBed.configureTestingModule({
      declarations: [ RaSidenavInnerComponent ],
      providers: [{provide: RaAuthService, useValue: authSpy},
                  {provide: RaResponsiveService, useValue: resSpy}],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaSidenavInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user profile at startup', () => {
    expect(component.user).toEqual(userStub);
  });

  it('should hide the app logo on small screens', () => {
    const resSpy = fixture.debugElement.injector
      .get(RaResponsiveService) as jasmine.SpyObj<RaResponsiveService>;
    resSpy.isActive.and.returnValue(true);
    fixture.detectChanges();

    // hide app logo and show small user info
    const userInfo: HTMLElement = fixture.nativeElement
      .querySelector('ra-user-menu-user');

    expect(resSpy.isActive).toHaveBeenCalled();
    expect(resSpy.isActive).toHaveBeenCalledWith('xs');
    expect(userInfo).toBeTruthy();
  });

  it('should display the app logo on medium to large screens', () => {
    const resSpy = fixture.debugElement.injector
      .get(RaResponsiveService) as jasmine.SpyObj<RaResponsiveService>;
    resSpy.isActive.and.returnValue(false);
    fixture.detectChanges();

    const logo = fixture.nativeElement
      .querySelector('ra-logo');

    expect(resSpy.isActive).toHaveBeenCalled();
    expect(resSpy.isActive).toHaveBeenCalledWith('xs');
    expect(logo).toBeTruthy();
  })

  it('#showUserMenuNav should show/hide userMenuNav', () => {
    // userMenuNav:
    // - profile
    // - help
    // - logout
    // default to false
    const nav = fixture.nativeElement
      .querySelector('ra-navigation');

    expect(nav).toBeTruthy();

    component.showUserMenuNav = true;
    fixture.detectChanges();

    const userMenuNav = fixture.nativeElement
      .querySelector('ra-user-menu-nav');

    expect(userMenuNav).toBeTruthy();
  });

  it('should toggle on/off `<ra-user-menu-nav>` when '
     + '`<ra-user-menu-user>` is clicked', () => {
       const resSpy = fixture.debugElement.injector
         .get(RaResponsiveService) as jasmine.SpyObj<RaResponsiveService>;
       resSpy.isActive.and.returnValue(true);
       fixture.detectChanges();

       expect(component.showUserMenuNav).toBe(false);

       let userMenuNav = fixture.nativeElement
         .querySelector('ra-user-menu-nav');
       expect(userMenuNav).toBeFalsy();

       const userInfo: HTMLElement = fixture.nativeElement
         .querySelector('ra-user-menu-user');
       userInfo.dispatchEvent(new Event('click'));

       expect(component.showUserMenuNav).toBe(true);
       userMenuNav = fixture.nativeElement
         .querySelector('ra-user-menu-nav');
       expect(userMenuNav).toBeFalsy();
     });
});
