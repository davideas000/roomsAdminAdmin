import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, first } from 'rxjs/operators';
import { RaApiService } from 'src/app/api.service';
import { RaRoom } from 'src/app/models/room.model';
import { RaHeaderTitleService } from '../header/header-title.service';

@Component({
  selector: 'ra-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.scss']
})
export class RaNewReservationComponent implements OnInit {
  loading: boolean = true;
  error: boolean = false;
  room: RaRoom;

  @ViewChild('title') pageTitle: ElementRef;

  constructor(private route: ActivatedRoute,
              private apiService: RaApiService,
              private title: Title,
              private headerTitle: RaHeaderTitleService) {}

  ngOnInit() {
    const pagetitle = this.pageTitle.nativeElement
      .getAttribute('pageTitle');
    this.title.setTitle(pagetitle);
    this.headerTitle.setTitle(pagetitle);

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
                this.apiService.getRoomById$(params.get('room'))),
      first()
    ).subscribe((room: RaRoom) => {
      this.room = room;
      this.loading = false;
    }, _ => {{
      this.loading = false;
      this.error = true;
    }});
  }

}
