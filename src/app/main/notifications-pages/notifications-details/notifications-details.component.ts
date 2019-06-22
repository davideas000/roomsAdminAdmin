import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RaApiService } from 'src/app/api.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RaNotification } from 'src/app/models/notification.model';
import { switchMap, tap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { RaHeaderTitleService } from '../../header/header-title.service';

@Component({
  selector: 'ra-notifications-details',
  templateUrl: './notifications-details.component.html',
  styleUrls: ['./notifications-details.component.scss']
})
export class RaNotificationsDetailsComponent implements OnInit {
  notification: RaNotification;

  @ViewChild('pageTitle') pageTitle: ElementRef;

  loading: boolean;
  error = false;

  constructor(public apiService: RaApiService,
              private route: ActivatedRoute,
              private title: Title,
              private headerTitle: RaHeaderTitleService) {}

  ngOnInit() {
    this.setTitle();
    this.route.paramMap.pipe(
      tap(_ => {
        this.loading = true;
      }),
      switchMap(
        (params: ParamMap) =>
          this.apiService.getNotificationById$(params.get('id'))
      )
    ).subscribe((notification: RaNotification) => {
      this.notification = notification
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
