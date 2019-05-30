import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RaRoom } from 'src/app/models/room.model';
import { Title } from '@angular/platform-browser';
import { RaApiService } from 'src/app/api.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RaResponsiveService } from 'src/app/responsive.service';
import { switchMap, first } from 'rxjs/operators';
import { RaHeaderTitleService } from '../../header/header-title.service';

@Component({
  selector: 'ra-rooms-details',
  templateUrl: './rooms-details.component.html',
  styleUrls: ['./rooms-details.component.scss']
})
export class RaRoomsDetailsComponent implements OnInit {
  loading = true;
  error = false;

  room: RaRoom;

  @ViewChild('pageTitle') pageTitle: ElementRef;

  constructor(public apiService: RaApiService,
              private route: ActivatedRoute,
              private title: Title,
              private headerTitle: RaHeaderTitleService,
              public responsiveService: RaResponsiveService) {}

  ngOnInit() {
    this.setTitle();

    this.route.paramMap.pipe(
      switchMap(
        (params: ParamMap) =>
          this.apiService.getRoomById$(params.get('id'))
      ),
      first(),
    ).subscribe(
      (room: RaRoom) => {
        this.room = room
        this.loading = false;
      }, _ => {
        this.error = true;
        this.loading = false;
      }
    );

  }

  private setTitle() {
    const pageTitle = this.pageTitle.nativeElement
      .getAttribute('pageTitle');
    this.title.setTitle(pageTitle);
    this.headerTitle.setTitle(pageTitle);
  }

}
