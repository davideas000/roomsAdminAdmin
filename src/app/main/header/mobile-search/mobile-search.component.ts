import { Component } from '@angular/core';
import { RaApiService } from 'src/app/api.service';
import { first } from 'rxjs/operators';
import { RaRoom } from 'src/app/models/room.model';

@Component({
  selector: 'ra-mobile-search',
  templateUrl: './mobile-search.component.html',
  styleUrls: ['./mobile-search.component.scss']
})
export class RaMobileSearchComponent {
  searchResults = [];
  opened: boolean = false;
  searching: boolean = false;
  error: boolean = false;

  constructor(private apiService: RaApiService) { }

  openSearch() {
    this.opened = true;
  }

  closeSearch() {
    this.opened = false;
    this.error = false;
    this.searchResults = [];
  }

  searchRoom(searchTerm) {

    this.error = false;

    if (!searchTerm) {
      this.searchResults = [];
      return;
    }

    this.searching = true;

    this.apiService.roomSearch$({name: searchTerm})
      .pipe(first())
      .subscribe(
        (rooms: RaRoom[]) => {
          this.searching = false;
          const result = [];
          rooms.forEach(
            room => {
              const rx = RegExp(`(.*)(${searchTerm})(.*)`, 'i');
              const r = room.name.match(rx);
              let n: {name:string, id:string};
              if(r) {
                n = {
                  name: `${r[1]}<span class="ra-mobile-search-highlight">${r[2]}</span>${r[3]}`,
                  id: room._id
                };
                result.push(n);
              }
            });
          this.searchResults = result;
        },
        _ => {
          this.error = true;
          this.searching = false;
        });

  }

  hideError() {
    this.error = false;
  }
}
