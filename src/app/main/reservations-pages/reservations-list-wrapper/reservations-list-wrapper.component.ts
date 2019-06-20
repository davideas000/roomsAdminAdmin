import { Component, OnInit, Input } from '@angular/core';
import { RaReservation } from 'src/app/models/reservation.model';

@Component({
  selector: 'ra-reservations-list-wrapper',
  templateUrl: './reservations-list-wrapper.component.html',
  styleUrls: ['./reservations-list-wrapper.component.scss']
})
export class RaReservationsListWrapperComponent implements OnInit {
  listType: string;

  private reservationsAll: RaReservation[];
  private _reservations: RaReservation[];
  @Input()
  set reservations(v) {
    this._reservations = v;
    this.reservationsAll = v;
    this.getRoomTypesAndDeps();
  }
  get reservations() {
    return this._reservations;
  }

  roomTypes = new Set<string>();
  deps = new Map<string, string>();

  searching = false;

  @Input() actionButtons: string;
  @Input() showTextareaOnRemove: boolean;

  ngOnInit() {
    this.listType = localStorage.getItem('listType') || 'grid';
  }

  private getRoomTypesAndDeps() {
    this._reservations.forEach(r => {
      this.roomTypes.add(r.room.type);
      this.deps.set(r.room.department.acronym, r.room.department._id);
    });
  }

  toggleListType() {
    this.listType = this.listType === 'list' ? 'grid' : 'list';
    localStorage.setItem('listType', this.listType);
  }

  onSearch(q) {
    if (q instanceof Event) return;

    this.searching = true;
    this._reservations = this.reservationsAll.filter(r => {
      const room = r.room;
      const hasName = room.name.includes(q.name);
      const hasType = room.type == q.type || !q.type;
      const hasDep = room.department._id == q.department
        || !q.department;
      return (hasName && hasType && hasDep);
    });
    this.searching = false;
  }

}
