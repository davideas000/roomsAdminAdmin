import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

import { RaMainComponent } from './main.component';
import { RaResponsiveService } from '../responsive.service';

@Component({selector: 'router-outlet', template: ''})
class FakeOutlet {}

@Component({selector: 'mat-sidenav', template: ''})
class FakeSidenav {
  toggle() {}
}

describe('RaMainComponent', () => {
  let component: RaMainComponent;
  let fixture: ComponentFixture<RaMainComponent>;

  beforeEach(async(() => {
    const resSpy = jasmine.createSpyObj('RaResponsiveService',
                                        ['isActive']);
    TestBed.configureTestingModule({
      declarations: [ RaMainComponent, FakeOutlet, FakeSidenav ],
      providers: [{provide: RaResponsiveService, useValue: resSpy}],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaMainComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should toggle on/off `sidenav` when `ra-header` emits '
     + 'a `menuButtonClick` event', () => {
       fixture.detectChanges();
       const resSpy = fixture.debugElement.injector
         .get(RaResponsiveService) as jasmine.SpyObj<RaResponsiveService>;
       resSpy.isActive.and.returnValue(true);

       const menu: HTMLElement = fixture.nativeElement
         .querySelector('ra-header');
       menu.dispatchEvent(new Event('menuButtonClick'));

       expect(resSpy.isActive).toHaveBeenCalled();
       expect(resSpy.isActive).toHaveBeenCalledWith('xs');

       const isSidenavOpened = localStorage
         .getItem('isSidenavOpened') == 'true';
       expect(isSidenavOpened).toBe(false);

       localStorage.clear();
     });

  it('should retrieve #isSidenavOpened from localStorage '
     + 'at startup', () => {
       const resSpy = fixture.debugElement.injector
         .get(RaResponsiveService) as jasmine.SpyObj<RaResponsiveService>;
       resSpy.isActive.and.returnValue(false);

       localStorage.setItem('isSidevnavOpened', 'false');

       fixture.detectChanges();

       expect(resSpy.isActive).toHaveBeenCalled();
       expect(resSpy.isActive).toHaveBeenCalledWith('xs');
       expect(resSpy.isActive).toHaveBeenCalledWith('md');

       expect(component.isSidenavOpened).toBe(false);
     });

});
