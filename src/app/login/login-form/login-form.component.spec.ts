import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaLoginFormComponent } from './login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RaAngularMaterialModule } from 'src/app/angular-material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

export function createNewEvent(eventName: string, bubbles = false, cancelable = false) {
  let evt = document.createEvent('CustomEvent');
  evt.initCustomEvent(eventName, bubbles, cancelable, null);
  return evt;
}

describe('RaLoginFormComponent', () => {
  let component: RaLoginFormComponent;
  let fixture: ComponentFixture<RaLoginFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaLoginFormComponent ],
      imports: [ ReactiveFormsModule, RaAngularMaterialModule, NoopAnimationsModule ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should rease a `loginSubmit` event when the form is submitted ',
     () => {
       const inputs = fixture.nativeElement
         .querySelectorAll('input');
       const stubValues = {email: 'email@test', password: 'fakepass'};
       const ev = createNewEvent('input');
       inputs[0].value = stubValues.email;
       inputs[0].dispatchEvent(ev);

       inputs[1].value = stubValues.password;
       inputs[1].dispatchEvent(ev);

       component.loginSubmit
         .subscribe(formValue => expect(formValue).toEqual(stubValues));

       const subEv = createNewEvent('ngSubmit');
       const form = fixture.nativeElement.querySelector('form');
       form.dispatchEvent(subEv);
     });
});
