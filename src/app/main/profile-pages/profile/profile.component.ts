import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { RaAuthService } from '../../../auth/auth.service';
import { RaUser } from '../../../models/user.model';
import { Title } from '@angular/platform-browser';
import { RaHeaderTitleService } from '../../header/header-title.service';

@Component({
  selector: 'ra-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class RaProfileComponent implements OnInit {
  user: RaUser;

  loading = true;
  error = false;

  @ViewChild('title') pageTitle: ElementRef;

  constructor(private title: Title,
              private headerTitle: RaHeaderTitleService,
              private authService: RaAuthService) {}

  ngOnInit() {
    this.setTitle();
    this.authService.profile$
      .subscribe(
        (user: RaUser) => {
          this.user  = user;
          this.loading = false;
        },
        _ => {
          this.loading = false;
          this.error = true;
        }
      );
  }

  private setTitle() {
    const titleStr = this.pageTitle.nativeElement
      .getAttribute('pageTitle');
    this.title.setTitle(titleStr);
    this.headerTitle.setTitle(titleStr);
  }
}
