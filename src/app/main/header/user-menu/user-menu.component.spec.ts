import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { of } from 'rxjs';
import { RaUserMenuComponent } from './user-menu.component';
import { RaAuthService } from 'src/app/auth/auth.service';

describe('RaUserMenuComponent', () => {
  let component: RaUserMenuComponent;
  let fixture: ComponentFixture<RaUserMenuComponent>;

  beforeEach(async(() => {
    const authSpy = jasmine.createSpyObj('RaAuthService', ['']);
    // initial user's information
    authSpy.profile$ = of({
      name: 'username',
      displayName: 'diplay name',
      email: 'user@email'
    });
    TestBed.configureTestingModule({
      declarations: [ RaUserMenuComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{provide: RaAuthService, useValue: authSpy}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaUserMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user\' information', () => {
    expect(component.user).toBeTruthy();
  });

});
