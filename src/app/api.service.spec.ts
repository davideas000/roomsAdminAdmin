import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RaApiService } from './api.service';
import { environment } from '../environments/environment';
import { RaAuthService } from './auth/auth.service';
import { RaNotificationStatus, RaNotificationCategory, RaNotification } from './models/notification.model';

describe('RaApiService', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['']);
    authSpy.accessToken = 'token1111';
    TestBed.configureTestingModule({
      providers: [RaApiService, {provide: RaAuthService, useValue: authSpy}],
      imports: [ HttpClientTestingModule ],
    });

    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([RaApiService], (service: RaApiService) => {
    expect(service).toBeTruthy();
  }));

  it('#getNotification$() should do a request to the \'/notifications\' api route',
     inject([RaApiService], (service: RaApiService) => {
       const stubData = {result: "notifications"};
       // without argument
       service.getNotifications$()
         .subscribe(
           r => {
             expect(r).toEqual(stubData as any);
           }
         );

       let req = httpTestingController.expectOne(`${environment.apiUrl}/notifications`)
       expect(req.request.method).toBe('GET');
       expect(req.request.headers.get('Authorization')).toBeTruthy();
       req.flush(stubData);

       // with argument
       const limitStub = 5;
       service.getNotifications$(limitStub)
         .subscribe(
           r => {
             expect(r).toEqual(stubData as any);
           }
         );

       req = httpTestingController.expectOne(
         `${environment.apiUrl}/notifications?limit=${limitStub}`
       );
       expect(req.request.method).toBe('GET');
       expect(req.request.headers.get('Authorization')).toBeTruthy();
       req.flush(stubData);

       httpTestingController.verify();
     }));

  it('#getNotificationById$() should fetch a notification by id',
     inject([RaApiService], (service: RaApiService) => {
       let result: RaNotification;
       const notificationStub = {
         _id: 'notiid',
         message: 'notifi message',
         status: RaNotificationStatus.unread,
         category: RaNotificationCategory.approvedReservation,
         createdAt: new Date()
       };
       const notifiIdStub = 'notifi001';
       service.getNotificationById$(notifiIdStub)
         .subscribe(
           r => {
             result = r;
           }
         );

       let req = httpTestingController
         .expectOne(`${environment.apiUrl}/notification/${notifiIdStub}`)
       expect(req.request.method).toBe('GET');
       expect(req.request.headers.get('Authorization')).toBeTruthy();
       req.flush(notificationStub);
       expect(result).toEqual(notificationStub);

       httpTestingController.verify();
     }));

  it('#markNotificationsAsRead$() should do a PUT request to' +
     'the \'/notifim\' api route',
     inject([RaApiService], (service: RaApiService) => {
       const stubData = 'sutbbb';
       service.markNotificationsAsRead$()
         .subscribe(
           r => expect(r).toEqual(stubData)
         );

       const req = httpTestingController.expectOne(`${environment.apiUrl}/notifim`)
       expect(req.request.method).toBe('PUT');
       expect(req.request.headers.get('Authorization')).toBeTruthy();
       expect(req.request.body).toEqual({});
       req.flush(stubData);
       httpTestingController.verify();
     }));

  it('#getApprovedReservations$() should do a GET request to' +
     'the \'/reservations?status=approved\' server route',
     inject([RaApiService], (service: RaApiService) => {
       const stubReservs = {
         result: [
           {
             _id: 'reserv001'
           }
         ]
       };

       service.getApprovedReservations$().subscribe(
         r => expect(r).toEqual(stubReservs as any),
         _ => fail('request should be successful')
       );

       const req = httpTestingController.expectOne(
         `${environment.apiUrl}/reservations?status=approved`);
       expect(req.request.method).toBe('GET');
       expect(req.request.headers.get('Authorization')).toBeTruthy();
       req.flush(stubReservs);
       httpTestingController.verify();
     }));

  it('#getPendingReservations$() should do a GET request to' +
     'the \'/reservations?status=pending\' server route',
     inject([RaApiService], (service: RaApiService) => {
       const stubReservs = {
         result: [
           {
             _id: 'reserv001'
           }
         ]
       };

       service.getPendingReservations$().subscribe(
         r => expect(r).toEqual(stubReservs as any),
         _ => fail('request should be successful')
       );

       const req = httpTestingController.expectOne(
         `${environment.apiUrl}/reservations?status=pending`);
       expect(req.request.method).toBe('GET');
       expect(req.request.headers.get('Authorization')).toBeTruthy();
       req.flush(stubReservs);
       httpTestingController.verify();
     }));

  it('#pendingReservationsByDep$() should return list of pending '
     + 'reservations by department',
     inject([RaApiService], (service: RaApiService) => {
       const stubReservs = {
         result: [
           {
             _id: 'reserv001'
           }
         ]
       };

       service.pendingReservationsByDep$.subscribe(
         r => expect(r).toEqual(stubReservs as any),
         _ => fail('request should be successful')
       );

       const req = httpTestingController.expectOne(
         `${environment.apiUrl}/reservations?status=pending&by=dep`);
       expect(req.request.method).toBe('GET');
       expect(req.request.headers.get('Authorization')).toBeTruthy();
       req.flush(stubReservs);
       httpTestingController.verify();
     }));

  it('#approvedReservationsByDep$() should return list of approved '
     + 'reservations by department',
     inject([RaApiService], (service: RaApiService) => {
       const stubReservs: any = {
         result: [
           {
             _id: 'reserv001'
           }
         ]
       };

       service.approvedReservationsByDep$.subscribe(
         r => expect(r).toEqual(stubReservs),
         _ => fail('request should be successful')
       );

       const req = httpTestingController.expectOne(
         `${environment.apiUrl}/reservations?status=approved&by=dep`);
       expect(req.request.method).toBe('GET');
       expect(req.request.headers.get('Authorization')).toBeTruthy();
       req.flush(stubReservs);
       httpTestingController.verify();
     }));

  it('#pendingReservationsCount$ should make a request to the server route that '
     + 'returns number of pending reservations',
     inject([RaApiService], (service: RaApiService) => {
       const countStub = 3;

       service.pendingReservationsCount$
         .subscribe(r => expect(r).toBe(countStub));

       const req = httpTestingController.expectOne(
         `${environment.apiUrl}/reservations?status=pending&op=count`);
       expect(req.request.method).toBe('GET');
       expect(req.request.headers.get('Authorization')).toBeTruthy();
       req.flush(countStub);
       httpTestingController.verify();
     }));

  it('#pendingReservationsCountByDep$ should make a request to the server route that '
     + 'return the number of pending reservations by department',
     inject([RaApiService], (service: RaApiService) => {
       const countStub = {result: 3};

       service.pendingReservationsCountByDep$
         .subscribe(r => expect(r).toBe(countStub));

       const req = httpTestingController.expectOne(
         `${environment.apiUrl}/reservations?status=pending&op=countdep`);
       expect(req.request.method).toBe('GET');
       expect(req.request.headers.get('Authorization')).toBeTruthy();
       req.flush(countStub);
       httpTestingController.verify();
     }));

  it('#pendingReservationsCountByDep$ should make a request to the server route that '
     + 'return the number of pending reservations by department',
     inject([RaApiService], (service: RaApiService) => {
       const countStub = {result: 3};

       service.pendingReservationsCountByDep$
         .subscribe(r => expect(r).toBe(countStub));

       const req = httpTestingController.expectOne(
         `${environment.apiUrl}/reservations?status=pending&op=countdep`);
       expect(req.request.method).toBe('GET');
       expect(req.request.headers.get('Authorization')).toBeTruthy();
       req.flush(countStub);
       httpTestingController.verify();
     }));

  it('#getReservationsByRoomAndPeriod$() should fetch reservations '
     + 'from the server', () => {
       const service: RaApiService = TestBed.get(RaApiService);

       const roomStub = 'roomid';
       const periodStub = { startDate: '19-19-1111',
                            endDate: '32-33-2222' };
       const resultStub = {result: true};
       let result: any;

       service.getReservationsByRoomAndPeriod$(roomStub, periodStub)
         .subscribe(r => result = r);
       const query = `?by=room&status=pending,approved&room=${roomStub}`;
       const date = `&startDate=${periodStub.startDate}&endDate=${periodStub.endDate}&`;
       const url = `${environment.apiUrl}/reservations${query}${date}`;

       const req = httpTestingController.expectOne(url);
       expect(req.request.method).toBe('GET');
       expect(req.request.headers.get('Authorization')).toBeTruthy();
       req.flush(resultStub);
       httpTestingController.verify();
       expect(result).toEqual(resultStub);
     });

  it('#removeReservation$() should do a PUT request to' +
     'the \'/reservation/:id\' server route for an approved reservation',
     inject([RaApiService], (service: RaApiService) => {

       const stubResult = 'success';
       const reasonStub = 'blublu';
       const stubReserv = {_id: 'reser001', status: 'approved'};
       service.removeReservation$(stubReserv as any, reasonStub).subscribe(
         r => expect(r).toEqual(stubResult),
         _ => fail('request should be successful')
       );

       const req = httpTestingController.expectOne(
         `${environment.apiUrl}/reservation/${stubReserv._id}`);
       expect(req.request.method).toBe('PUT');
       expect(req.request.headers.get('Authorization')).toBeTruthy();
       expect(req.request.body).toEqual({status: 'removed', reason: reasonStub});
       req.flush(stubResult);
       httpTestingController.verify();
     }));

  it('#removeReservation$() should do a PUT request to'
     + 'the server for a pending reservation',
     inject([RaApiService], (service: RaApiService) => {

       const stubResult = 'success';
       const reasonStub = '';
       const stubReserv = {_id: 'reser001', status: 'pending'};
       service.removeReservation$(stubReserv as any, reasonStub).subscribe(
         r => expect(r).toEqual(stubResult),
         _ => fail('request should be successful')
       );

       const req = httpTestingController.expectOne(
         `${environment.apiUrl}/reservation/${stubReserv._id}`);
       expect(req.request.method).toBe('PUT');
       expect(req.request.headers.get('Authorization')).toBeTruthy();
       expect(req.request.body).toEqual({status: 'removed'});
       req.flush(stubResult);
       httpTestingController.verify();
     }));

  it('#approveReserv$() should do a PUT request to'
     + 'the server',
     inject([RaApiService], (service: RaApiService) => {

       const stubResult: any = 'success';
       const stubReserv: any = {_id: 'reser001', status: 'pending'};
       service.approveReserv$(stubReserv).subscribe(
         r => expect(r).toEqual(stubResult),
         _ => fail('request should be successful')
       );

       const req = httpTestingController.expectOne(
         `${environment.apiUrl}/reservation/${stubReserv._id}`);
       expect(req.request.method).toBe('PUT');
       expect(req.request.headers.get('Authorization')).toBeTruthy();
       expect(req.request.body).toEqual({status: 'approved'});
       req.flush(stubResult);
       httpTestingController.verify();
     }));

  it('#getRoomById$() should do a GET request to the server route: '
     + '/room/:roomid', () =>{
       const apiService = TestBed.get(RaApiService);
       let roomStub = {_id: 'roomid', name: 'roomname'};
       let roomResult: any;

       apiService.getRoomById$(roomStub._id)
         .subscribe(room => roomResult = room);

       const req = httpTestingController.expectOne(
         `${environment.apiUrl}/room/${roomStub._id}`);
       req.flush(roomStub);

       expect(req.request.method).toBe('GET');
       expect(req.request.headers.get('Authorization')).toBeTruthy();
       expect(roomResult).toEqual(roomStub);

       httpTestingController.verify();

     });

  it('#getRoomTypes() should do a GET request to' +
     'the \'/rtypes\' server route',
     inject([RaApiService], (service: RaApiService) => {

       const stubResult = 'success';
       service.getRoomTypes$().subscribe(
         r => expect(r).toEqual(stubResult),
         _ => fail('request should be successful')
       );

       const req = httpTestingController.expectOne(
         `${environment.apiUrl}/rtypes`);
       expect(req.request.method).toBe('GET');
       expect(req.request.headers.get('Authorization')).toBeTruthy();
       req.flush(stubResult);
       httpTestingController.verify();
     }));

  it('#getDepartments() should do a GET request to' +
     'the \'/departments\' server route',
     inject([RaApiService], (service: RaApiService) => {

       const stubResult = 'success';
       service.getDepartments$().subscribe(
         r => expect(r).toEqual(stubResult),
         _ => fail('request should be successful')
       );

       const req = httpTestingController.expectOne(
         `${environment.apiUrl}/departments`);
       expect(req.request.method).toBe('GET');
       expect(req.request.headers.get('Authorization')).toBeTruthy();
       req.flush(stubResult);
       httpTestingController.verify();
     }));

  it('#roomSearch() should do a GET request to' +
     'the \'/rsearch?param=value&param=value...\' server route',
     inject([RaApiService], (service: RaApiService) => {

       const queryValues = {param1: "value1", param2: "value2"}
       const stubResult = 'success';
       service.roomSearch$(queryValues).subscribe(
         r => expect(r).toEqual(stubResult as any),
         _ => fail('request should be successful')
       );

       const req = httpTestingController.expectOne(
         `${environment.apiUrl}/rsearch?param1=value1&param2=value2&`);
       expect(req.request.method).toBe('GET');
       expect(req.request.headers.get('Authorization')).toBeTruthy();
       req.flush(stubResult);
       httpTestingController.verify();
     }));

  it('#roomSearch() should do a GET request to' +
     'the \'/rsearch\' server route if query are empty',
     inject([RaApiService], (service: RaApiService) => {

       const queryValues = {param1: "", param2: ""}
       const stubResult = 'success';
       service.roomSearch$(queryValues).subscribe(
         r => expect(r).toEqual(stubResult as any),
         _ => fail('request should be successful')
       );

       const req = httpTestingController.expectOne(
         `${environment.apiUrl}/rsearch`);
       expect(req.request.method).toBe('GET');
       expect(req.request.headers.get('Authorization')).toBeTruthy();
       req.flush(stubResult);
       httpTestingController.verify();
     }));

  it('#newReservation() should do a POST request to' +
     'the \'/reservation\' api route',
     inject([RaApiService], (service: RaApiService) => {
       const stubData = 'sutbbb';
       const stubReserv = {_id: "reserv01"};
       service.newReservation$(stubReserv)
         .subscribe(
           r => expect(r).toEqual(stubData)
         );

       const req = httpTestingController.expectOne(`${environment.apiUrl}/reservation`)
       expect(req.request.method).toBe('POST');
       expect(req.request.headers.get('Authorization')).toBeTruthy();
       expect(req.request.body).toEqual(stubReserv);
       req.flush(stubData);
       httpTestingController.verify();
     }));
});
