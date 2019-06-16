import { Component, OnInit } from '@angular/core';
import { RaResponsiveService } from 'src/app/responsive.service';
import { RaAuthService } from 'src/app/auth/auth.service';
import { RaUser } from 'src/app/models/user.model';

@Component({
  selector: 'ra-sidenav-inner',
  templateUrl: './sidenav-inner.component.html',
  styleUrls: ['./sidenav-inner.component.scss']
})
export class RaSidenavInnerComponent implements OnInit {
  showUserMenuNav = false;
  user: RaUser;

  constructor(public rs: RaResponsiveService,
              private authService: RaAuthService) { }

  ngOnInit() {
    this.authService.profile$
      .subscribe(user => this.user = user);
  }

  toggleUserMenuNav() {
    this.showUserMenuNav = !this.showUserMenuNav;
  }
}
