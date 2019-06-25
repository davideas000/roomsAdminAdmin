import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RaUser } from '../models/user.model';
import { tap, first } from 'rxjs/operators';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { ReplaySubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RaAuthService {

  profile$ = new ReplaySubject<RaUser>();
  accessToken: string;
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    this.checkLogin();
    if (this.isLoggedIn) this.getProfile();
  }

  private checkLogin() {
    const expiresAtStr = localStorage.getItem('expiresAt');
    this.accessToken = localStorage.getItem('accessToken');
    if(expiresAtStr && this.accessToken) {
      const expiresAt = moment(JSON.parse(expiresAtStr));
      this.accessToken = localStorage.getItem('accessToken');
      this.isLoggedIn = moment().isBefore(expiresAt);
    }
  }

  login(email: string, password: string) {
    return this.http.post<any>(
      `${environment.apiUrl}/login`,
      {email: email, password: password})
      .pipe(tap(res => this.setSession(res)));
  }

  private setSession(r: any) {
    this.profile$.next(r.profile);
    this.accessToken = r.token;
    this.isLoggedIn = true;
    const expiresAt = moment().add(r.expiresIn, 's');
    localStorage.setItem('accessToken', this.accessToken);
    localStorage.setItem('expiresAt',
                         JSON.stringify(expiresAt.valueOf()));
  }

  private getProfile() {
    this.http.get<any>(
      `${environment.apiUrl}/profile`,
      {headers: new HttpHeaders()
       .set("Authorization", `Bearer ${this.accessToken}`)})
      .pipe(first())
      .subscribe(user => {
        this.profile$.next(user);
      }, e => {
        if (e.status === 401) {
          this.logout();
          this.router.navigate(['/login']);
        }
        this.profile$.next(null);
      });
  }

  updateProfile(updateData: {name: string, displayName: string, email: string}): Observable<RaUser> {
    this.accessToken = localStorage.getItem("accessToken");
    return this.http.put<any>(
      `${environment.apiUrl}/profile`,
      updateData,
      {headers: new HttpHeaders()
       .set("Authorization", `Bearer ${this.accessToken}`)})
      .pipe(tap(user => {this.profile$.next(user)}));
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expiresAt');
    this.isLoggedIn = false;
    this.accessToken = null;
    this.profile$.next(null);
  }
}
