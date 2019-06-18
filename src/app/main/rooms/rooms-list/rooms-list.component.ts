import { Component, Input } from '@angular/core';
import { RaRoom } from 'src/app/models/room.model';

@Component({
  selector: 'ra-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss']
})
export class RaRoomsListComponent {
  @Input() rooms: RaRoom[];
  @Input() compact = false;
}
