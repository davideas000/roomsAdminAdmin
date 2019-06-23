import { TestBed, async, inject } from '@angular/core/testing';

import { RaAuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { RaAuthService } from '../auth/auth.service';

describe('RaAuthGuard', () => {
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const authSpy = jasmine.createSpyObj('RaAuthService', ['']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RaAuthGuard,
        {provide: Router, useValue: routerSpy},
        {provide: RaAuthService, useValue: authSpy}
      ]
    });
  });

  it('should ...', inject([RaAuthGuard], (guard: RaAuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('#canActivate() should redirect the unauthenticated user '
     + 'to the login page',
     inject([RaAuthGuard], (guard: RaAuthGuard) => {

       // when the user is logged in
       const authSpy = TestBed
         .get(RaAuthService) as jasmine.SpyObj<RaAuthService>;
       authSpy.isLoggedIn = true;

       let r = guard.canActivate(null, null);
       expect(r).toBe(true);

       // when the user isn't logged in
       authSpy.isLoggedIn = false;

       r = guard.canActivate(null, null);
       expect(r).toBe(false);

       const routerSpy = TestBed.get(Router) as jasmine.SpyObj<Router>;
       expect(routerSpy.navigate).toHaveBeenCalledTimes(1);
       expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
     }));
});
