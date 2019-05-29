import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ra-reservations-panel-header',
  templateUrl: './reservations-panel-header.component.html',
  styleUrls: ['./reservations-panel-header.component.scss']
})
export class RaReservationsPanelHeaderComponent {

  menuSelectedItem = 'all';
  menuItems = ['today', 'month', 'year', 'all'];

  @Output() filter = new EventEmitter<string>();

  filterBy(q: string) {
    this.menuSelectedItem = q;
    this.filter.emit(q);
  }

}
