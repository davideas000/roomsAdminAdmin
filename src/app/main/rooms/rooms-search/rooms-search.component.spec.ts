import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaRoomsSearchComponent } from './rooms-search.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RaRoomsSearchComponent', () => {
  let component: RaRoomsSearchComponent;
  let fixture: ComponentFixture<RaRoomsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaRoomsSearchComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaRoomsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a `search` event when `<ra-advanced-search>` or '
     + '`<ra-simple-form>` emit a `search` event', () => {
       // simple form
       let eventResult;
       component.search.subscribe(_=> eventResult = true);
       const simpleForm: HTMLElement = fixture.nativeElement
         .querySelector('ra-simple-form');

       simpleForm.dispatchEvent(new Event('search'));
       expect(eventResult).toBe(true);

       // advanced form
       component.advForm = true; // activate advanced form
       fixture.detectChanges();
       eventResult = false;
       component.search.subscribe(_=> eventResult = true);
       const advForm: HTMLElement = fixture.nativeElement
         .querySelector('ra-advanced-form');

       advForm.dispatchEvent(new Event('search'));
       expect(eventResult).toBe(true);
     });

  it('should show `advanced form` when button `advanced-form` '
     + 'is clicked', () => {
       // default to simple form
       expect(component.advForm).toBe(false);

       const advButton: HTMLButtonElement = fixture.nativeElement
         .querySelector('.btns button')
       advButton.dispatchEvent(new Event('click'));

       fixture.detectChanges();

       const advFormEl: HTMLElement = fixture.nativeElement
         .querySelector('ra-advanced-form');

       expect(component.advForm).toBe(true);
       expect(advFormEl).toBeTruthy();
     });

  it('should hide `advanced form` when `<ra-advanced-form>` '
     + 'emits a `cancel` event', () => {
       // show advanced form
       component.advForm = true;
       fixture.detectChanges();

       let advFormEl: HTMLElement = fixture.nativeElement
         .querySelector('ra-advanced-form');

       expect(advFormEl).toBeTruthy();

       advFormEl.dispatchEvent(new Event('cancel'));
       fixture.detectChanges();

       advFormEl = fixture.nativeElement
         .querySelector('ra-advanced-form');

       expect(advFormEl).toBeFalsy();
       expect(component.advForm).toBe(false);
     });

  it('#showAdvancedFormButton should show/hide `advanced-form-button`',
     () => {
       // default to true
       let btn = fixture.nativeElement
         .querySelector('.btns button');

       expect(component.showAdvancedFormButton).toBe(true);
       expect(btn).toBeTruthy();

       component.showAdvancedFormButton = false;
       fixture.detectChanges();

       btn = fixture.nativeElement
         .querySelector('.btns button');

       expect(btn).toBeFalsy();
     });

});
