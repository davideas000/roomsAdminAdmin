import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RaAuthService } from './auth.service';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import * as moment from 'moment';

// #############################
// helper functions
// #############################
function setSession() {
  const sessionData = {
    token: 'token001',
    expiresIn: 10000
  };

  const expiresAt = moment().add(sessionData.expiresIn, 's');
  localStorage.setItem('accessToken', sessionData.token);
  localStorage.setItem('expiresAt',
                       JSON.stringify(expiresAt.valueOf()));

  return sessionData;
}

describe('RaAuthService', () => {
  let httpTestingController: HttpTestingController;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        RaAuthService,
        {provide: Router, useValue: routerSpy}
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
  });

  beforeEach(() => {
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('accessToken');
  });

  it('should be created', () => {
    const service: RaAuthService = TestBed.get(RaAuthService);
    expect(service).toBeTruthy();
    // check default values
    expect(service.accessToken).toBeFalsy();
    expect(service.isLoggedIn).toBeFalsy();
  });

  it('#login() should log in the user and set a session', () => {
    const service: RaAuthService = TestBed.get(RaAuthService);
    const serverMockAnswer: any = {
      profile: {name: 'user1'},
      token: 'token001',
      expiresIn: 2000
    };

    service.login('fake@email.com', 'fakepass')
      .subscribe(r => expect(r).toEqual(serverMockAnswer));
    const req = httpTestingController
      .expectOne(`${environment.apiUrl}/login`);
    expect(req.request.method).toBe('POST');

    // should set user's profile
    service.profile$.subscribe(
      user => expect(user).toEqual(serverMockAnswer.profile));

    req.flush(serverMockAnswer);
    httpTestingController.verify();

    // should set #accessToken
    expect(service.accessToken).toBe(serverMockAnswer.token);

    // should save access token and expiration date to localStorage
    const accessToken = localStorage.getItem('accessToken');
    expect(accessToken).toBeTruthy();

    const expiresAt = localStorage.getItem('expiresAt');
    expect(expiresAt).toBeTruthy();

    // should set #isLoggedIn to true
    expect(service.isLoggedIn).toBe(true)

  });

  it('should retrieve #accessToken from the localStorage and '
     + 'check the expiration date', () => {
       const sessionData = setSession();

       const service: RaAuthService = TestBed.get(RaAuthService);

       expect(service.isLoggedIn).toBe(true);
       expect(service.accessToken).toBe(sessionData.token);
     });

  it('should fetch the user\'s profile if the user is logged in', () => {
    const sessionData = setSession();
    const service: RaAuthService = TestBed.get(RaAuthService);

    const profileMock: any = {id: 'user0001', name: 'username'};

    service.profile$
      .subscribe(profile => expect(profile).toEqual(profileMock));

    const req = httpTestingController
      .expectOne(`${environment.apiUrl}/profile`);

    expect(req.request.method).toBe('GET');
    expect(req.request.headers.has('Authorization')).toBe(true);
    expect(req.request.headers.get('Authorization'))
      .toBe(`Bearer ${sessionData.token}`);

    req.flush(profileMock);
    httpTestingController.verify();
  });

  it('should logout the user when the fetch of the profile '
     + 'throws an error with a status code of 401', () => {
       const sessionData = setSession();
       const service: RaAuthService = TestBed.get(RaAuthService);

       let profileResult;
       service.profile$
         .subscribe(profile => profileResult = profile);

       const req = httpTestingController
         .expectOne(`${environment.apiUrl}/profile`);

       req.flush('error', {status: 401, statusText: 'Unauthorized'});

       expect(req.request.method).toBe('GET');
       expect(req.request.headers.has('Authorization')).toBe(true);
       expect(req.request.headers.get('Authorization'))
         .toBe(`Bearer ${sessionData.token}`);

       expect(profileResult).toBe(null);
       expect(service.isLoggedIn).toBe(false);
       expect(service.accessToken).toBe(null);

       const routerSpy = TestBed.get(Router);
       expect(routerSpy.navigate).toHaveBeenCalledTimes(1);
       expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);

       httpTestingController.verify();
     });

  it('#logout() should log out the user', () => {
    setSession();

    const service: RaAuthService = TestBed.get(RaAuthService);

    service.logout();
    expect(service.accessToken).toBeFalsy();
    expect(service.isLoggedIn).toBeFalsy();
  })

  it('#updateProfile() should make a PUT request to the server',
     () => {
       const service: RaAuthService = TestBed.get(RaAuthService);
       const updateDataStub: any = {
         name: 'newname',
         displayName: 'newdisplayname',
         email: 'newemail@email.com'
       };
       service.updateProfile(updateDataStub).subscribe(
         (newUser) => expect(newUser).toEqual(updateDataStub),
         _ => fail('should not fail')
       );
       const req = httpTestingController.expectOne(`${environment.apiUrl}/profile`);
       expect(req.request.method).toBe('PUT');
       expect(req.request.body).toEqual(updateDataStub);
       req.flush(updateDataStub);
       httpTestingController.verify();

       // should update current user
       service.profile$.subscribe(
         user => expect(user).toEqual(updateDataStub),
         _ => fail('should not fail')
       );
     });
});
