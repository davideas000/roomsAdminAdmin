import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaLoginErrorMessageComponent } from './login-error-message.component';
import { SharedModule } from 'src/app/shared/shared.module';

function createNewEvent(eventName: string, bubbles = false, cancelable = false) {
  let evt = document.createEvent('CustomEvent');
  evt.initCustomEvent(eventName, bubbles, cancelable, null);
  return evt;
}

describe('RaLoginErrorMessageComponent', () => {
  let component: RaLoginErrorMessageComponent;
  let fixture: ComponentFixture<RaLoginErrorMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaLoginErrorMessageComponent ],
      imports: [ SharedModule ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaLoginErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initially display default message', () => {
    const msgEl: HTMLElement = fixture.nativeElement
      .querySelector('ra-message-panel');

    expect(msgEl).toBeTruthy();
    expect(msgEl.textContent).toBe(
      'Não foi possível contatar o servidor, por favor, '
        + 'verifique sua conexão com a Internet '
        + 'e tente novamentex'  // the 'x' is the close button
    );
  });

  it('should display the error message according to #errorCode', () => {
    component.errorCode = 'missing-email';
    fixture.detectChanges();
    const msgEl: HTMLElement = fixture.nativeElement
      .querySelector('ra-message-panel');
    expect(msgEl).toBeTruthy();
    expect(msgEl.textContent)
      .toBe('O email não é válidox'); // the 'x' is the close button

    component.errorCode = 'user-not-found';
    fixture.detectChanges();
    const msgEl2: HTMLElement = fixture.nativeElement
      .querySelector('ra-message-panel');
    expect(msgEl2).toBeTruthy();
    expect(msgEl2.textContent)
      .toBe('Não há usuário cadastrado com esse emailx'); // the 'x' is the close button
  });

  it('should raise `closeMessage` event when `ra-message-panel`' +
     ' emit close event', () => {
       let closeMessageEvent: boolean;
       component.closeMessage.subscribe(r => closeMessageEvent = r);

       const msgEl: HTMLElement = fixture.nativeElement
         .querySelector('ra-message-panel');
       const ev = createNewEvent('close');
       msgEl.dispatchEvent(ev);

       fixture.detectChanges();

       expect(closeMessageEvent).toBe(true);
     });
});
