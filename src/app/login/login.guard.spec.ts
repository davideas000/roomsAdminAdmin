import { TestBed, async, inject } from '@angular/core/testing';

import { RaLoginGuard } from './login.guard';
import { Router } from '@angular/router';
import { RaAuthService } from '../auth/auth.service';

describe('RaLoginGuard', () => {
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const authSpy = jasmine.createSpyObj('RaAuthService', ['']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RaLoginGuard,
        {provide: Router, useValue: routerSpy},
        {provide: RaAuthService, useValue: authSpy}
      ]
    });
  });

  it('should ...', inject([RaLoginGuard], (guard: RaLoginGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('#canActive() should redirect the user to the main page when '
     + 'he is logged in',
     inject([RaLoginGuard], (guard: RaLoginGuard) => {
       // it isn't possible for a logged in user to access the login page

       // when the user is logged in
       const authSpy = TestBed
         .get(RaAuthService) as jasmine.SpyObj<RaAuthService>;
       authSpy.isLoggedIn = true;

       let r = guard.canActivate(null, null);
       expect(r).toBe(false);

       const routerSpy = TestBed.get(Router) as jasmine.SpyObj<Router>;
       expect(routerSpy.navigate).toHaveBeenCalledTimes(1);
       expect(routerSpy.navigate).toHaveBeenCalledWith(['/main']);

       // when the user is logged out
       authSpy.isLoggedIn = false;

       r = guard.canActivate(null, null);
       expect(r).toBe(true);
     }));
});
