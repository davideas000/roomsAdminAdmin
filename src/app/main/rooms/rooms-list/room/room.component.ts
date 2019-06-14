import { Component, Input } from '@angular/core';
import { RaRoom } from 'src/app/models/room.model';

@Component({
  selector: 'ra-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RaRoomComponent {
  @Input() room: RaRoom;
  @Input() compact = false;
}
