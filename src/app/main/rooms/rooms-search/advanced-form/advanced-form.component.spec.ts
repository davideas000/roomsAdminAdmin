import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaAdvancedFormComponent } from './advanced-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import * as moment from 'moment';

describe('RaAdvancedFormComponent', () => {
  let component: RaAdvancedFormComponent;
  let fixture: ComponentFixture<RaAdvancedFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaAdvancedFormComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaAdvancedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a `search` event when the form is submitted', () => {

    let stubValues: any = {
      startDate: moment('2019-01-01'),
      endDate:  moment('2019-01-02'),
      startTime: '10:11',
      endTime: '11:11',
      type: 'roomtype',
      department: 'roomdep',
      width: '299',
      length: '3000',
      capacity: '444'
    };

    component.searchForm.setValue(stubValues);

    let eventResult;
    component.search.subscribe(ev => eventResult = ev);

    const submitBtn: HTMLElement = fixture.nativeElement
      .querySelector('button[type=submit]');

    submitBtn.dispatchEvent(new Event('click'));

    stubValues.startDate = stubValues.startDate.format('YYYY-MM-DD');
    stubValues.endDate = stubValues.endDate.format('YYYY-MM-DD');

    expect(eventResult).toEqual(stubValues);
  });

  it('should emit a `cancel` event when the `cancel button` '
     + 'is clicked', () => {
       let eventResult = false;
       component.cancel.subscribe(_ => eventResult = true);

       const cancelBtn: HTMLButtonElement = fixture.nativeElement
         .querySelector('.search-btn-wrapper button[type=button]');

       cancelBtn.dispatchEvent(new Event('click'));

       expect(eventResult).toBe(true);
     });

});
