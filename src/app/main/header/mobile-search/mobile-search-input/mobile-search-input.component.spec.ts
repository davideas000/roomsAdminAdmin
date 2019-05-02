import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RaMobileSearchInputComponent } from './mobile-search-input.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('RaMobileSearchInputComponent', () => {
  let component: RaMobileSearchInputComponent;
  let fixture: ComponentFixture<RaMobileSearchInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaMobileSearchInputComponent ],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaMobileSearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should raise a `raChange` event when the value of '
     + 'the input element changes', fakeAsync(() => {
       const inputEl: HTMLInputElement = fixture.nativeElement
         .querySelector('input');

       const stubValue = 'useless value';

       let result: string;
       component.raChange
         .subscribe(v => {
           result = v;
         });

       inputEl.value = stubValue;
       inputEl.dispatchEvent(new Event('input'));
       tick(500);

       expect(result).toBe(stubValue);
     }));

  it('#reset() should clear input element', fakeAsync(() => {
    let result: string = 'some useless value';
    component.raChange
      .subscribe(v => result = v);

    component.reset();

    tick(500);

    expect(result).toBe(null);
  }));
});
