import { Component, OnInit, ViewChild } from '@angular/core';
import { RaAuthService } from 'src/app/auth/auth.service';
import { RaUser } from 'src/app/models/user.model';
import { Overlay, OverlayRef, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';

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
