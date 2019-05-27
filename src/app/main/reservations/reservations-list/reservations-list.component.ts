import { Component, Input } from '@angular/core';
import { RaReservation } from 'src/app/models/reservation.model';

@Component({
  selector: 'ra-reservations-list',
  templateUrl: './reservations-list.component.html',
  styleUrls: ['./reservations-list.component.scss']
})
export class RaReservationsListComponent {
  @Input() reservations: RaReservation[];
  @Input('type') listtype: string;
  @Input() showTitle = true;
  @Input() showActions = true;
  @Input() showStatus = false;
}
