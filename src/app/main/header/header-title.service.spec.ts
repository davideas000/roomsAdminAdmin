import { TestBed } from '@angular/core/testing';

import { RaHeaderTitleService } from './header-title.service';

describe('RaHeaderTitleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RaHeaderTitleService = TestBed.get(RaHeaderTitleService);
    expect(service).toBeTruthy();
  });

  it('#setTitle() should trigger #headerTitle$ observable', () => {
    const service: RaHeaderTitleService = TestBed
      .get(RaHeaderTitleService);

    let title: string;
    let titleStub = 'new title';

    service.headerTitle$.subscribe(t => title = t);
    service.setTitle(titleStub);

    expect(title).toBe(titleStub);
  });
});
