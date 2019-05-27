import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RaHeaderTitleService {
  headerTitle$ = new ReplaySubject<string>();

  setTitle(title: string) {
    this.headerTitle$.next(title);
  }
}
