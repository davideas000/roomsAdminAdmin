import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RaUser } from '../models/user.model';
import { tap, first } from 'rxjs/operators';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RaAuthService {

  profile$ = new ReplaySubject<RaUser>();
  accessToken: string;
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient) {
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
      }, _ => {
        this.profile$.next(null);
      });
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expiresAt');
    this.isLoggedIn = false;
    this.accessToken = null;
    this.profile$.next(null);
  }
}
