import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RaAuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RaLoginGuard implements CanActivate {
  constructor(private authService: RaAuthService,
              private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.isLoggedIn) {
      this.router.navigate(['/main']);
      return false;
    }
    return true;
  }
}
