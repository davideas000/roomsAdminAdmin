import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ra-login-error-message',
  templateUrl: './login-error-message.component.html',
  styleUrls: ['./login-error-message.component.scss']
})
export class RaLoginErrorMessageComponent {
  @Input() errorCode: string;
  @Output() closeMessage = new EventEmitter<boolean>();

  clearErrorMessage() {
    this.closeMessage.emit(true);
  }

}
