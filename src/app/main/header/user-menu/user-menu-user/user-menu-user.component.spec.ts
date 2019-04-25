import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaUserMenuUserComponent } from './user-menu-user.component';

@Component({selector: 'mat-icon', template: ''}) class FakeMatIcon {}

@Component({selector: 'ra-user-photo', template: ''})
class FakeUserPhoto{ @Input() photoURL }

describe('RaUserMenuUserComponent', () => {
  let component: RaUserMenuUserComponent;
  let fixture: ComponentFixture<RaUserMenuUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaUserMenuUserComponent, FakeMatIcon, FakeUserPhoto ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaUserMenuUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user\'s info', () => {
    let userStub = {
      _id: 'userid',
      name: 'username',
      role: 'userrole',
      displayName: 'user display name',
      email: 'useremail',
      photoURL: 'photo.png'
    };

    component.user = userStub;
    fixture.detectChanges();

    let userEls: NodeList = fixture.nativeElement
      .querySelectorAll('.user-info span');

    expect(userEls.length).toBe(2);
    expect(userEls[0].textContent).toBe(userStub.displayName);
    expect(userEls[1].textContent).toBe(userStub.email);
  });

});
