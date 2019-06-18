import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'ra-rooms-search',
  templateUrl: './rooms-search.component.html',
  styleUrls: ['./rooms-search.component.scss']
})
export class RaRoomsSearchComponent {

  @Output() search = new EventEmitter();

  @Input() departments: Map<string, string>;
  @Input() types: Set<string>;

  @Input() showAdvancedFormButton = true;
  advForm = false;

  onSearch(v) {
    this.search.emit(v);
  }

  advancedSearchToggle() {
    this.advForm = !this.advForm;
    this.onSearch(null);
  }

}
