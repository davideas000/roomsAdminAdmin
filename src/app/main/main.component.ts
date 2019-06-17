import { Component } from '@angular/core';
import { RaResponsiveService } from '../responsive.service';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'ra-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class RaMainComponent {

  isSidenavOpened = true;

  constructor(public rs: RaResponsiveService) {}

  ngOnInit() {

    this.isSidenavOpened = localStorage
      .getItem('isSidenavOpened') === 'true'
    // don't recover `isSidenavOpened` from localStorage for mobile users
      && !this.rs.isActive('md')
      && !this.rs.isActive('xs');
  }

  onMenuButtonClick(sidenav: MatSidenav) {
    sidenav.toggle()
    if (!this.rs.isActive('xs')) {
      localStorage.setItem('isSidenavOpened', sidenav.opened.toString());
    }
  }

}
