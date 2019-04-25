import { Component } from '@angular/core';
import { RaThemeService } from 'src/app/theme.service';
import { RaAuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ra-user-menu-nav',
  templateUrl: './user-menu-nav.component.html',
  styleUrls: ['./user-menu-nav.component.scss']
})
export class RaUserMenuNavComponent {

  constructor(private theme: RaThemeService,
              private authService: RaAuthService,
              private router: Router) { }

  toggleDarkTheme() {
    this.theme.toggleDarkTheme();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
