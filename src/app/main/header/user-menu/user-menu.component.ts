import { Component, OnInit } from '@angular/core';
import { RaAuthService } from 'src/app/auth/auth.service';
import { RaUser } from 'src/app/models/user.model';

@Component({
  selector: 'ra-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class RaUserMenuComponent implements OnInit {
  user: RaUser;

  constructor(private authService: RaAuthService) { }

  ngOnInit() {
    this.authService.profile$
      .subscribe(user => this.user = user);
  }

}
