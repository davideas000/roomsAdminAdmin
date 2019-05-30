import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { RaResponsiveService } from 'src/app/responsive.service';
import { RaReservation } from 'src/app/models/reservation.model';
import { RaApiService } from 'src/app/api.service';
import { Subject, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'ra-reservations-panel',
  templateUrl: './reservations-panel.component.html',
  styleUrls: ['./reservations-panel.component.scss']
})
export class RaReservationsPanelComponent implements OnInit, OnDestroy {
  @Input() roomid: string;
  reservations: RaReservation[];
  loading = true;
  error = false;

  fetchReservations$ = new Subject<{startDate: string, endDate: string}>();
  fetchReservations_$: Subscription;

  constructor(public rs: RaResponsiveService,
              private apiService: RaApiService) { }

  ngOnInit() {
    this.fetchReservations_$ = this.fetchReservations$
      .pipe(switchMap(period => {
        return this.apiService
          .getReservationsByRoomAndPeriod$(this.roomid, period);
      }))
      .subscribe(
        reservs => {
          this.reservations = reservs;
          this.loading = false;
        },
        _ => {
          this.error = true;
          this.loading = false;
        }
      );

    this.fetchReservations$.next(null);
  }

  ngOnDestroy() {
    this.fetchReservations_$.unsubscribe();
  }

  filterBy(filterBy: string) {

    if (this.error) return;
    this.loading = true;

    let period: any = {};
    switch(filterBy) {
      case 'today':
        const today = moment().format('YYYY-MM-DD');
        period.startDate = today;
        period.endDate = today;
        break;
      case 'month':
        let month = moment(1, 'DD');
        period.startDate = month.format('YYYY-MM-DD');
        month = month.date(31);
        period.endDate = month.format('YYYY-MM-DD');
        break;
      case 'year':
        let year = moment('01 01', 'DD MM');
        period.startDate = year.format('YYYY-MM-DD');
        year = year.date(31).month(11);
        period.endDate = year.format('YYYY-MM-DD');
        break;
    }

    this.fetchReservations$.next(period);
  }

}
