import { Component, Input } from '@angular/core';

@Component({
  selector: 'ra-reservations-list',
  templateUrl: './reservations-list.component.html',
  styleUrls: ['./reservations-list.component.scss']
})
export class RaReservationsListComponent {
  @Input() reservations;
  @Input('type') listtype: string;
  @Input() showTitle = true;
  @Input() showActions = true;
  @Input() showStatus = false;
}
