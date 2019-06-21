import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RaHeaderTitleService } from '../../header/header-title.service';
import { RaApiService } from 'src/app/api.service';
import { RaReservation } from 'src/app/models/reservation.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ra-reservations-approved-dep',
  templateUrl: './reservations-approved-dep.component.html',
  styleUrls: ['./reservations-approved-dep.component.scss']
})
export class RaReservationsApprovedDepComponent implements OnInit {

  loading = true;
  error = false;

  reservations: RaReservation[];
  getReservations_$: Subscription;

  @ViewChild('title') pageTitle: ElementRef;

  constructor(private title: Title,
              private headerTitle: RaHeaderTitleService,
              private apiService: RaApiService) {}

  ngOnInit() {
    this.setTitle();

    this.getReservations_$ = this.apiService.getApprovedReservationsByDep$()
      .subscribe(
        (reservs: RaReservation[]) => {
          this.reservations = reservs;
          this.loading = false;
        },
        _ => {
          this.loading = false;
          this.error = true;
        }
      );
  }

  private setTitle() {
    const titleStr = this.pageTitle.nativeElement
      .getAttribute('pageTitle');
    this.title.setTitle(titleStr);
    this.headerTitle.setTitle(titleStr);
  }

  ngOnDestroy() {
    this.getReservations_$.unsubscribe();
  }

}
