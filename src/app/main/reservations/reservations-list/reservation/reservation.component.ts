import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RaReservation } from 'src/app/models/reservation.model';

export type RaReservationActionEvents = 'remove' | 'reject' | 'approve';

@Component({
  selector: 'ra-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class RaReservationComponent implements OnInit {
  @Input() reservation: RaReservation;
  @Input() showPhoto = true;
  @Input() showActions = true;
  @Input() actionButtons: 'remove' | 'approve-reject';
  @Input() showTitle = true;
  @Input() showStatus = false;
  @Output() action = new EventEmitter<RaReservationActionEvents>();

  ngOnInit() {
    if (this.showPhoto && !this.reservation.room.photos)
      this.reservation.room.photos = [];

    if (!this.actionButtons) {
      this.actionButtons = "remove";
    }
  }

  onRemove() {
    this.action.emit('remove');
  }

  onApprove() {
    this.action.emit('approve');
  }

  onReject() {
    this.action.emit('reject');
  }

}
