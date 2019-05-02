import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

import { RaMobileSearchComponent } from './mobile-search.component';
import { RaAngularMaterialModule } from 'src/app/angular-material.module';
import { RaApiService } from 'src/app/api.service';

import { of, throwError } from 'rxjs';

@Component({selector: 'ra-mobile-search-input', template: ''})
class FakeSearchInput {
  value = 'useless';
}

@Component({selector: 'ra-message-panel', template: ''})
class FakeMessagePanel {}

describe('RaMobileSearchComponent', () => {
  let component: RaMobileSearchComponent;
  let fixture: ComponentFixture<RaMobileSearchComponent>;

  beforeEach(async(() => {
    const apiSpy = jasmine.createSpyObj('RaApiService', ['roomSearch$']);
    TestBed.configureTestingModule({
      declarations: [ RaMobileSearchComponent, FakeMessagePanel,
                      FakeSearchInput ],
      imports: [RaAngularMaterialModule],
      providers: [
        {provide: RaApiService, useValue: apiSpy},
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaMobileSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the search panel when the search button is clicked',
     () => {
       const searchBtn: HTMLButtonElement = fixture.nativeElement
         .querySelector('button');

       searchBtn.dispatchEvent(new Event('click'));
       fixture.detectChanges();

       const panelEl = fixture.nativeElement
         .querySelector('div.search-panel');

       expect(component.opened).toBe(true);
       expect(panelEl).toBeTruthy();
     });

  it('should close the search panel when the `close search panel button`'
     + 'is clicked', () => {
       component.opened = true;
       fixture.detectChanges();

       let panelEl: HTMLElement = fixture.nativeElement
         .querySelector('div.search-panel');

       expect(panelEl).toBeTruthy();

       const closeBtn: HTMLButtonElement = fixture.nativeElement
         .querySelector('button.btns');

       closeBtn.dispatchEvent(new Event('click'));
       fixture.detectChanges();

       panelEl = fixture.nativeElement
         .querySelector('div.search-panel');

       expect(panelEl).toBeFalsy();
     });

  it('should call the API service when the input box component raises a '
     + '`raChange` event ', () => {
       component.opened = true;
       fixture.detectChanges();

       const apiSpy = fixture.debugElement.injector
         .get(RaApiService) as jasmine.SpyObj<RaApiService>;
       apiSpy.roomSearch$.and.returnValue(of([]))

       const inputComp: HTMLElement = fixture.nativeElement
         .querySelector('ra-mobile-search-input');
       inputComp.dispatchEvent(new Event('raChange'));

       expect(apiSpy.roomSearch$).toHaveBeenCalledTimes(1);
     });

  it('#searchRoom() should display the search results on success',
     () => {
       const roomListStub = [
         {_id: 'room1', name: 'room 1'},
         {_id: 'room2', name: 'room 2'}
       ];
       const apiSpy = fixture.debugElement.injector
         .get(RaApiService) as jasmine.SpyObj<RaApiService>;
       apiSpy.roomSearch$.and.returnValue(of(roomListStub))

       component.searchRoom('room');
       component.opened = true;
       fixture.detectChanges();

       const roomElList: NodeList = fixture.nativeElement
         .querySelectorAll('a.room');

       expect(roomElList.length).toBe(2);
     });

  it('#searchRoom() should display an error message on failure',
     () => {
       const apiSpy = fixture.debugElement.injector
         .get(RaApiService) as jasmine.SpyObj<RaApiService>;
       apiSpy.roomSearch$.and.returnValue(throwError('error'))

       component.searchRoom('room');
       component.opened = true;
       fixture.detectChanges();

       const errorMsg: HTMLElement = fixture.nativeElement
         .querySelector('ra-message-panel');

       expect(errorMsg).toBeTruthy();
     });

  it('should dismiss the error message when `ra-message-panel` raises '
     + 'a `close` event', () => {
       component.opened = true;
       component.error = true;
       fixture.detectChanges();

       let errorMsgEl: HTMLElement = fixture.nativeElement
         .querySelector('ra-message-panel');
       errorMsgEl.dispatchEvent(new Event('close'));
       fixture.detectChanges();

       errorMsgEl = fixture.nativeElement
         .querySelector('ra-message-panel');

       expect(component.error).toBe(false);
       expect(errorMsgEl).toBeFalsy();
     });

  it('#searching should toggle spinner', () => {
    component.opened = true;
    component.searching = true;
    fixture.detectChanges();

    const spinnerEl = fixture.nativeElement
      .querySelector('.spinner');

    expect(spinnerEl).toBeTruthy();
  });

  it('should close the search panel when `div.backdrop` is clicked',
     () => {
       component.opened = true;
       fixture.detectChanges();

       const backdropEl: HTMLElement = fixture.nativeElement
         .querySelector('div.backdrop');

       backdropEl.dispatchEvent(new Event('click'));
       fixture.detectChanges();

       const searchPanelEl: HTMLElement = fixture.nativeElement
         .querySelector('div.search-panel');

       expect(component.opened).toBe(false);
       expect(searchPanelEl).toBeFalsy();
     });

});
