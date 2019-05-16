import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaNewReservationMessageComponent } from './new-reservation-message.component';
import { RaNMessageType, RaNMessageMsgType } from './nmessage.model';
import { SharedModule } from 'src/app/shared/shared.module';

describe('RaNewReservationMessageComponent', () => {
  let component: RaNewReservationMessageComponent;
  let fixture: ComponentFixture<RaNewReservationMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaNewReservationMessageComponent ],
      imports: [ SharedModule ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaNewReservationMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a success message when `#message.type === success` '
     + 'and `#message.msgType === success`', () => {
       component.message = {
         type: RaNMessageType.success,
         show: true,
         msgType: RaNMessageMsgType.success
       };
       fixture.detectChanges();

       const msgEl: HTMLElement = fixture.nativeElement
         .querySelector('ra-message-panel');

       expect(msgEl).toBeTruthy();
       expect(msgEl.textContent).toBeTruthy();
       expect(msgEl.textContent).toBe('Reserva realizada com sucessox');
       // the 'x' is the close button from ra-message-penal
     });

  it('should display an error message when `#message.type === error` '
     + 'and `#message.msgType === error`', () => {
       component.message = {
         type: RaNMessageType.error,
         show: true,
         msgType: RaNMessageMsgType.error
       };
       fixture.detectChanges();

       const msgEl: HTMLElement = fixture.nativeElement
         .querySelector('ra-message-panel');

       expect(msgEl).toBeTruthy();
       expect(msgEl.textContent).toBeTruthy();
       expect(msgEl.textContent).toBe(
         'Já existe uma reserva nesse espaço no período especificadox'
         // the 'x' is the close button from the ra-message-penal
       );
     });

  it('should display an network-error message when '
     + '`#message.type === error` and `#message.msgType === neterror`',
     () => {
       component.message = {
         type: RaNMessageType.error,
         show: true,
         msgType: RaNMessageMsgType.neterror
       };
       fixture.detectChanges();

       const msgEl: HTMLElement = fixture.nativeElement
         .querySelector('ra-message-panel');

       expect(msgEl).toBeTruthy();
       expect(msgEl.textContent).toBeTruthy();
       expect(msgEl.textContent).toBe(
         'Ops algo deu errado, por favor, verifique sua conexão '
           + 'com a Internet e tente novamentex'
         // the 'x' is the close button from the ra-message-penal
       );
     });

  it('should raise a close event when `ra-message-panel` raises '
     + 'a close event', () => {
       let result = false;
       component.close.subscribe(_ => result = true)

       const msgEl: HTMLElement = fixture.nativeElement
         .querySelector('ra-message-panel');
       msgEl.dispatchEvent(new Event('close'));

       expect(result).toBe(true);
     });

});
