import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaUserMenuNavComponent } from './user-menu-nav.component';
import { RaAngularMaterialModule } from 'src/app/angular-material.module';
import { RaThemeService } from 'src/app/theme.service';

describe('RaUserMenuNavComponent', () => {
  let component: RaUserMenuNavComponent;
  let fixture: ComponentFixture<RaUserMenuNavComponent>;

  beforeEach(async(() => {
    let themeSpy = jasmine.createSpyObj('RaThemeService', ['toggleDarkTheme']);
    TestBed.configureTestingModule({
      declarations: [ RaUserMenuNavComponent ],
      imports: [ RaAngularMaterialModule ],
      providers: [{provide: RaThemeService, useValue: themeSpy}]
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
});
