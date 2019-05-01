import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';
import { RaAuthService } from './auth/auth.service';
import { RaNotification } from './models/notification.model';
import { RaReservation } from './models/reservation.model';
import { RaRoom } from './models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RaApiService {

  constructor(private http: HttpClient,
              private authService: RaAuthService) {}

  private getUrlAndHeaders(path: string) {
    return {
      url: `${environment.apiUrl}/${path}`,
      headers: {headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.authService.accessToken}`)}
    };
  }

  private _get(path: string): Observable<any> {
    const urlAndHeaders = this.getUrlAndHeaders(path);
    return this.http.get<any>(urlAndHeaders.url,  urlAndHeaders.headers);
  }

  private _post(path: string, data: any): Observable<any> {
    const urlAndHeaders = this.getUrlAndHeaders(path);
    return this.http.post<any>(urlAndHeaders.url, data, urlAndHeaders.headers);
  }

  private _put(path: string, data: any): Observable<any> {
    const urlAndHeaders = this.getUrlAndHeaders(path);
    return this.http.put<any>(urlAndHeaders.url, data, urlAndHeaders.headers);
  }

  private _delete(path: string): Observable<any> {
    const urlAndHeaders = this.getUrlAndHeaders(path);
    return this.http.delete(
      urlAndHeaders.url,
      urlAndHeaders.headers
    );
  }

  getNotifications$(): Observable<RaNotification[]> {
    return this._get('notifications');
  }

  markNotificationsAsRead$(): Observable<any> {
    return this._put('notifim', {});
  }

  getApprovedReservations$(): Observable<RaReservation[]> {
    return this._get('reservations?status=approved');
  }

  getPendingReservations$(): Observable<RaReservation[]> {
    return this._get('reservations?status=pending');
  }

  get pendingReservationsByDep$(): Observable<RaReservation[]> {
    return this._get('reservations?status=pending&by=dep');
  }

  get approvedReservationsByDep$(): Observable<RaReservation[]> {
    return this._get('reservations?status=approved&by=dep');
  }

  get pendingReservationsCount$(): Observable<number> {
    return this._get('reservations?status=pending&op=count');
  }

  get pendingReservationsCountByDep$(): Observable<{result: number}> {
    return this._get('reservations?status=pending&op=countdep');
  }

  removeReservation$(reserv: RaReservation, reason: string): Observable<any> {
    const path = `reservation/${reserv._id}`;
    let data: {status: string, reason?: string} = {status: 'removed'}
    if (reason) {
      data.reason = reason
    }
    return this._put(path, data);
  }

  approveReserv$(reserv: RaReservation): Observable<RaReservation> {
    const path = `reservation/${reserv._id}`;
    return this._put(path, {status: 'approved'});
  }

  getRoomTypes$(): Observable<any[]> {
    return this._get('rtypes');
  }

  getDepartments$(): Observable<any[]> {
    return this._get('departments');
  }

  roomSearch$(f: any): Observable<RaRoom[]> {
    let query = "?";
    for(let k in f) {
      if (f[k]) {
        query += `${k}=${f[k]}&`;
      }
    }
    let url = 'rsearch';
    if (query.length > 1) {
      url += query;
    }
    return this._get(url);
  }

  newReservation$(data: any) {
    return this._post('reservation', data);
  }

}