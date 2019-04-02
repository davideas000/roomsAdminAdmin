import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class RaThemeService {
  private _isDarkTheme: boolean;
  get isDarkTheme(): boolean {
    return this._isDarkTheme;
  }

  private _darkThemeClassName: string = 'ra-dark-theme';
  get darkThemeClassName() {
    return this._darkThemeClassName;
  }

  constructor(public overlayContainer: OverlayContainer) {
    const isDarkTheme = localStorage.getItem('isDarkTheme');
    this._isDarkTheme = isDarkTheme === 'true';
    this.updateOverlayContainerClassList();
  }

  private updateOverlayContainerClassList() {
    const overlayClassList = this.overlayContainer
      .getContainerElement().classList;
    overlayClassList.remove(this.darkThemeClassName);
    if(this.isDarkTheme) {
      overlayClassList.add(this.darkThemeClassName);
    }
  }

  toggleDarkTheme() {
    this._isDarkTheme = !this._isDarkTheme;
    this.updateOverlayContainerClassList();
    localStorage.setItem('isDarkTheme', this._isDarkTheme.toString());
  }

}
