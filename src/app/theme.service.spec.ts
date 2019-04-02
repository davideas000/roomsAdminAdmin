import { TestBed } from '@angular/core/testing';

import { RaThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({})
    localStorage.clear();
  });

  it('should be created', () => {
    const service: RaThemeService = TestBed.get(RaThemeService);
    expect(service).toBeTruthy();
  });

  it('#isDarkTheme should initially be false', () => {
    const service: RaThemeService = TestBed.get(RaThemeService);
    expect(service.isDarkTheme).toBe(false);
    expect(service.overlayContainer
           .getContainerElement().classList.contains('ra-dark-theme'))
      .toBe(false);
  });

  it('#toggleDarkTheme() should toggle on/off the dark theme',
     () => {
       const service: RaThemeService = TestBed.get(RaThemeService);
       service.toggleDarkTheme();
       expect(service.isDarkTheme).toBe(true);
       expect(service.overlayContainer
              .getContainerElement().classList.contains(
                service.darkThemeClassName))
         .toBe(true);
       service.toggleDarkTheme();
       expect(service.isDarkTheme).toBe(false);
       expect(service.overlayContainer
              .getContainerElement().classList.contains(
                service.darkThemeClassName))
         .toBe(false);
     });
});
