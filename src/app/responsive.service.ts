import { Injectable } from '@angular/core';

import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RaResponsiveService {

  private currentMedia: string;

  constructor() {
    this.checkWidth();
    fromEvent(window, 'resize').pipe(
      debounceTime(500)
    ).subscribe(
      _ => {
        this.checkWidth();
      }
    );
  }

  private checkWidth() {
    const vwidth = window.innerWidth;
    if (vwidth < 599) {
      this.currentMedia = 'xs';
    } else if (vwidth < 969) {
      this.currentMedia = 'md';
    } else {
      this.currentMedia = 'lg';
    }
  }

  isActive(media: string): boolean {
    return this.currentMedia === media;
  }
}
