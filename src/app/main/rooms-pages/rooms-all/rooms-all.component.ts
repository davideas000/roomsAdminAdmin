import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RaApiService } from 'src/app/api.service';
import { RaRoom } from 'src/app/models/room.model';
import { switchMap } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { RaHeaderTitleService } from '../../header/header-title.service';

@Component({
  selector: 'ra-rooms-all',
  templateUrl: './rooms-all.component.html',
  styleUrls: ['./rooms-all.component.scss']
})
export class RaRoomsAllComponent implements OnInit {
  loading = true;
  error = false;

  rooms: RaRoom[];
  roomTypes: Set<string>;
  roomDeps: Map<string, string>;

  searching = false;
  search$ = new Subject();
  search_$: Subscription;

  @ViewChild('title') pageTitle: ElementRef;

  compactRoomsList = false;

  constructor(private apiS: RaApiService,
              private title: Title,
              private headerTitle: RaHeaderTitleService) { }

  ngOnInit() {
    this.search_$ = this.search$
      .pipe(switchMap(q => this.apiS.roomSearch$(q)))
      .subscribe(rooms => {
        this.rooms = rooms;
        this.getTypesAndDeps();
        this.hideSpinners();
      }, _ => {
        this.loading = false;
        this.error = true;
      });

    this.search$.next(null);
    this.setTitle();
    this.restoreCompactRoomsList();
  }

  private restoreCompactRoomsList() {
    const comp = localStorage.getItem('compactRoomsList');
    this.compactRoomsList = comp == 'true';
  }

  private setTitle() {
    const title = this.pageTitle.nativeElement
      .getAttribute('pageTitle');
    this.title.setTitle(title);
    this.headerTitle.setTitle(title);
  }

  private hideSpinners() {
    this.searching = false;
    this.loading = false;
  }

  searchRoom(q) {
    // this solves Angular Material escape key bug
    if (q instanceof Event) return;
    this.searching = true;
    this.search$.next(q);
  }

  private getTypesAndDeps() {
    if(this.roomDeps && this.roomTypes) return;

    this.roomTypes = new Set<string>();
    this.roomDeps = new Map<string, string>();
    this.rooms.forEach(room => {
      this.roomTypes.add(room.type);
      this.roomDeps.set(room.department.acronym, room.department._id);
    });
  }

  toggleCompactRoomsList() {
    this.compactRoomsList = !this.compactRoomsList;
    localStorage.setItem('compactRoomsList',
                         this.compactRoomsList.toString())
  }

}
