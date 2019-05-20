import { Component, OnInit } from '@angular/core';
import { RaApiService } from 'src/app/api.service';
import { RaNotification } from 'src/app/models/notification.model';
import { timer } from 'rxjs';
import { switchMap, tap, first, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ra-notifications-panel',
  templateUrl: './notifications-panel.component.html',
  styleUrls: ['./notifications-panel.component.scss']
})
export class RaNotificationsPanelComponent implements OnInit {

  notifications: RaNotification[];

  numUnreadNotifications: number = 0;

  showPanel: boolean = false;
  error: boolean = false;

  alive = true;

  constructor(private apiService: RaApiService) {}

  ngOnInit() {

    timer(0, 120000).pipe(
      takeWhile(_ => this.alive),
      switchMap(_ => this.apiService.getNotifications$().pipe(
        tap((notifications: RaNotification[]) => {
          this.numUnreadNotifications = notifications
            .filter(notifi => notifi.status === 'unread').length
        })
      )))
      .subscribe(
        notifis => {
          notifis = notifis.reverse().slice(0, 6);
          this.notifications = notifis;
        },
        _ => {
          this.error = true;
        }
      );
  }

  ngOnDestroy() {
    this.alive = false;
  }

  markNotificationsAsRead() {
    if (this.numUnreadNotifications === 0) return;

    this.apiService.markNotificationsAsRead$().pipe(first())
      .subscribe(
        _ => this.numUnreadNotifications = 0,
        _ => {
          this.error = true;
        }
      );
  }
}
