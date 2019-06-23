import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RaAuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RaAuthGuard implements CanActivate {
  constructor(public authService: RaAuthService,
              public router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/login']);
    }
    return this.authService.isLoggedIn;
  }
}
