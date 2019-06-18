import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import { RaSimpleFormComponent } from './simple-form.component';
import { RaAngularMaterialModule } from 'src/app/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';

describe('RaSimpleFormComponent', () => {
  let component: RaSimpleFormComponent;
  let fixture: ComponentFixture<RaSimpleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaSimpleFormComponent ],
      imports: [RaAngularMaterialModule, ReactiveFormsModule,
                NoopAnimationsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaSimpleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a search event when the value of the form is changed',
     fakeAsync(() => {
       let eventResult;
       component.search.subscribe(v => eventResult = v);

       const valueStub: any = {
         name: 'roomname',
         type: 'roomtype',
         department: 'roomdep'
       };
       component.searchForm.setValue(valueStub);

       tick(500);

       expect(eventResult).toEqual(valueStub);
     }));
});
