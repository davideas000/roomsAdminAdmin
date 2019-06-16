import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { RaApiService } from 'src/app/api.service';
import { timer } from 'rxjs';
import { switchMap, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ra-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class RaNavigationComponent implements OnInit, OnDestroy {

  numberOfPendingReservations: number = 0;
  numberOfPendingReservationsDep: number = 0;

  alive = true;
  @Input() showDepNav = false;

  constructor(private apiS: RaApiService) { }

  ngOnInit() {
    timer(0, 10000)
      .pipe(
        takeWhile(_ => this.alive),
        switchMap(_ => this.apiS.getPendingReservationsCount$())
      )
      .subscribe(n => {
        this.numberOfPendingReservations = n;
      });

    timer(0, 10000)
      .pipe(
        takeWhile(_ => this.alive),
        switchMap(_ => this.apiS.getPendingReservationsCountByDep$())
      )
      .subscribe(n => {
        this.numberOfPendingReservationsDep = n;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
