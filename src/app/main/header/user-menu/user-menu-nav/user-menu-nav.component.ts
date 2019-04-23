import { Component } from '@angular/core';
import { RaThemeService } from 'src/app/theme.service';

@Component({
  selector: 'ra-user-menu-nav',
  templateUrl: './user-menu-nav.component.html',
  styleUrls: ['./user-menu-nav.component.scss']
})
export class RaUserMenuNavComponent {

  constructor(public theme: RaThemeService) { }

  toggleDarkTheme() {
    this.theme.toggleDarkTheme();
  }

}
