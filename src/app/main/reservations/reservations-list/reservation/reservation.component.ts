import { Component, OnInit, Input } from '@angular/core';
import { RaReservation } from 'src/app/models/reservation.model';

@Component({
  selector: 'ra-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class RaReservationComponent implements OnInit {
  @Input() reservation: RaReservation;
  @Input() showPhoto = true;
  @Input() showActions = true;
  @Input() showTitle = true;
  @Input() showStatus = false;

  ngOnInit() {
    if (this.showPhoto && !this.reservation.room.photos)
      this.reservation.room.photos = [];
  }

}
