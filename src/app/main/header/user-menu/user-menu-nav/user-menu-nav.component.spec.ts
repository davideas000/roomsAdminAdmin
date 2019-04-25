import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaUserMenuNavComponent } from './user-menu-nav.component';
import { RaAngularMaterialModule } from 'src/app/angular-material.module';
import { RaThemeService } from 'src/app/theme.service';
import { RaAuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

describe('RaUserMenuNavComponent', () => {
  let component: RaUserMenuNavComponent;
  let fixture: ComponentFixture<RaUserMenuNavComponent>;

  beforeEach(async(() => {
    let themeSpy = jasmine.createSpyObj('RaThemeService', ['toggleDarkTheme']);
    let authSpy = jasmine.createSpyObj('RaAuthSpyService', ['logout']);
    let routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [ RaUserMenuNavComponent ],
      imports: [ RaAngularMaterialModule ],
      providers: [{provide: RaThemeService, useValue: themeSpy},
                  {provide: RaAuthService, useValue: authSpy},
                  {provide: Router, useValue: routerSpy}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaUserMenuNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display navigation menu', () => {
    const aEls: NodeList = fixture.nativeElement.querySelectorAll('a');
    expect(aEls).toBeTruthy();
    expect(aEls[0].textContent).toBe('Perfil');
    expect(aEls[1].textContent).toBe('Ajuda');
    expect(aEls[2].textContent).toBe('Sair');
  });

  it('should toggle dark theme on `mat-slide-toggle`\'s change-event',
     () => {
       const toggle: HTMLElement = fixture.nativeElement
         .querySelector('mat-slide-toggle');
       toggle.dispatchEvent(new Event('change'));

       const themeSpy = fixture.debugElement.injector.get(RaThemeService);
       expect(themeSpy.toggleDarkTheme).toHaveBeenCalledTimes(1);
     });

  it('#logout() should logout the user', () => {
    // test `logout()` from the HTML element point of view

    // logout the user when `<mat-list-item>` raise a click event
    const listItemEl: HTMLElement = fixture.nativeElement
      .querySelector('mat-list-item:last-child');

    listItemEl.dispatchEvent(new Event('click'));

    const authSpy = fixture.debugElement.injector.get(RaAuthService);
    const routerSpy = fixture.debugElement.injector.get(Router);
    expect(authSpy.logout).toHaveBeenCalledTimes(1);
    expect(routerSpy.navigate).toHaveBeenCalledTimes(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

});
