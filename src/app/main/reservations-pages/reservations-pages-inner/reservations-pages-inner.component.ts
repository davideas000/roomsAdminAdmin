import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { RaApiService } from 'src/app/api.service';
import { RaReservation } from 'src/app/models/reservation.model';
import { Subscription } from 'rxjs';

export type PageTypes = 'approved-reservations' | 'pending-reservations'
  | 'approved-reservations-dep' | 'pending-reservations-dep';

@Component({
  selector: 'ra-reservations-pages-inner',
  templateUrl: './reservations-pages-inner.component.html',
  styleUrls: ['./reservations-pages-inner.component.scss']
})
export class RaReservationsPagesInnerComponent implements OnInit, OnDestroy {
  loading = true;
  error = false;

  @Input() pageType: PageTypes;

  reservations: RaReservation[];
  getReservations_$: Subscription;

  reservsListActionButtons: 'remove' | 'approve-reject';

  showTextareaOnRemove: boolean;

  constructor(private apiService: RaApiService) { }

  ngOnInit() {
    this.reservsListActionButtons = 'remove';
    let getRervs;
    switch(this.pageType) {
      case 'approved-reservations':
        getRervs = this.apiService.getApprovedReservations$();
        break;
      case 'pending-reservations':
        getRervs = this.apiService.getPendingReservations$();
        break;
      case 'approved-reservations-dep':
        this.showTextareaOnRemove = true;
        getRervs = this.apiService.getApprovedReservationsByDep$();
        break;
      case 'pending-reservations-dep':
        getRervs = this.apiService.getPendingReservationsByDep$();
        this.reservsListActionButtons = 'approve-reject';
        break;
    }

    this.getReservations_$ = getRervs
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

  ngOnDestroy() {
    this.getReservations_$.unsubscribe();
  }

}
