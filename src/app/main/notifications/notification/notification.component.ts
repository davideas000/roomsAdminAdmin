import { Component, Input } from '@angular/core';
import { RaNotification } from 'src/app/models/notification.model';

@Component({
  selector: 'ra-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  @Input() notification: RaNotification;
}
