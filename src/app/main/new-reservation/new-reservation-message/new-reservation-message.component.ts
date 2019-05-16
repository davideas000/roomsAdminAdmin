import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RaNMessage } from './nmessage.model';

@Component({
  selector: 'ra-new-reservation-message',
  templateUrl: './new-reservation-message.component.html'
})
export class RaNewReservationMessageComponent {
  @Input() message: RaNMessage;
  @Output() close = new EventEmitter();

  onClose() {
    this.close.emit();
  }
}
