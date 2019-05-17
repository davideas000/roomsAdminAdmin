import { TestBed } from '@angular/core/testing';

import { RaResponsiveService } from './responsive.service';

describe('RaResponsiveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RaResponsiveService = TestBed.get(RaResponsiveService);
    expect(service).toBeTruthy();
  });

  it('#isActive() should return a boolean', () => {
    const service: RaResponsiveService = TestBed.get(RaResponsiveService);
    // there is no way to test for the width of the window,
    const result = service.isActive('kk'); // this is a fake value, just to exercise the code
    expect(result).toBe(false);
  })
});
