import { Component, Input } from '@angular/core';
import { RaUser } from 'src/app/models/user.model';

@Component({
  selector: 'ra-user-menu-user',
  templateUrl: './user-menu-user.component.html',
  styleUrls: ['./user-menu-user.component.scss']
})
export class RaUserMenuUserComponent {
  @Input() user: RaUser;
}
