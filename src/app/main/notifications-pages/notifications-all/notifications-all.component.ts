import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { RaApiService } from 'src/app/api.service';
import { RaNotification } from 'src/app/models/notification.model';
import { Title } from '@angular/platform-browser';
import { RaHeaderTitleService } from '../../header/header-title.service';

@Component({
  selector: 'ra-notifications-all',
  templateUrl: './notifications-all.component.html',
  styleUrls: ['./notifications-all.component.scss']
})
export class RaNotificationsAllComponent implements OnInit {
  notifications: RaNotification[];

  loading = true;
  error = false;

  @ViewChild('pageTitle') pageTitle: ElementRef;

  constructor(private apiS: RaApiService,
              private title: Title,
              private headerTitle: RaHeaderTitleService) { }

  ngOnInit() {
    this.setTitle();

    this.apiS.getNotifications$()
      .subscribe(notifis => {
        this.notifications = notifis.reverse();
        this.loading = false;
      }, _ => {
        this.loading = false;
        this.error = true;
      });
  }

  private setTitle() {
    const pagetitle = this.pageTitle.nativeElement.getAttribute('pageTitle');
    this.title.setTitle(pagetitle);
    this.headerTitle.setTitle(pagetitle)
  }
}
