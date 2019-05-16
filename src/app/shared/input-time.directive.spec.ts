import { RaInputTimeDirective } from './input-time.directive';
import { Component, DebugElement } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// helper functions
function triggerChangeEvent(el: HTMLInputElement) {
  let evt = document.createEvent('CustomEvent');
  evt.initCustomEvent('input', false, false, null);
  el.dispatchEvent(evt);
  evt = document.createEvent('CustomEvent');
  evt.initCustomEvent('change', false, false, null);
  el.dispatchEvent(evt);
}

@Component({
  template: `
<input [formControl]="fcontrol" [raInputTime]="fcontrol" type="text">
`
})
class TestComponent
{
  fcontrol = new FormControl('');
}

describe('RaInputTimeDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputDe: DebugElement;
  let testComponet: TestComponent;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ RaInputTimeDirective, TestComponent ],
      imports: [ ReactiveFormsModule ]
    })
      .createComponent(TestComponent);
    fixture.detectChanges();

    inputDe = fixture.debugElement.query(By.directive(RaInputTimeDirective));
    testComponet = fixture.componentInstance;
  });

  it('should create an instance', () => {
    const directive = new RaInputTimeDirective();
    expect(directive).toBeTruthy();
  });

  it('should not accept letters', () => {
    const inputEl: HTMLInputElement = inputDe.nativeElement;
    inputEl.value = 'ddddeeeeaaaaa';
    triggerChangeEvent(inputEl);
    fixture.detectChanges()
    expect(testComponet.fcontrol.value).toBe('');
  });

  it('should accept time in the HHMM format (e.g., 0830) '
     + 'and output it in the HH:MM format (e.g., 08:30)', () => {
       const inputEl: HTMLInputElement = inputDe.nativeElement;
       inputEl.value = '0830';
       triggerChangeEvent(inputEl);
       fixture.detectChanges()
       expect(testComponet.fcontrol.value).toBe('08:30'); // output format should be in the 'HH:MM' format;
     });

  it('should accept time in the HH:MM format (e.g., 08:30)', () => {
    const inputEl: HTMLInputElement = inputDe.nativeElement;
    inputEl.value = '08:30';
    triggerChangeEvent(inputEl);
    fixture.detectChanges()
    expect(testComponet.fcontrol.value).toBe('08:30'); // output format should be in the 'HH:MM' format;
  });

  it('should turn time in the `99999999` format into 23:59', () => {
    const inputEl: HTMLInputElement = inputDe.nativeElement;
    inputEl.value = '99999999';
    triggerChangeEvent(inputEl);
    fixture.detectChanges()
    expect(testComponet.fcontrol.value).toBe('23:59'); // output format should be in the 'HH:MM' format;
  });

  it('should turn an invalid value into a valid one', () => {
    const inputEl: HTMLInputElement = inputDe.nativeElement;
    // e.g.
    // aaa1219kkkkk => 12:19
    // aaa12:19kkkkk => 12:19
    // aaa44:19kkkkk => 23:19
    // aaa1479kkkkk => 14:59
    // 4419 => 23:19
    // 14:79 => 14:59

    inputEl.value = 'aaa1219kkkkk';
    triggerChangeEvent(inputEl);
    fixture.detectChanges()
    expect(testComponet.fcontrol.value).toBe('12:19'); // output format should be in the 'HH:MM' format;

    inputEl.value = 'aaa12:19kkkkk';
    triggerChangeEvent(inputEl);
    fixture.detectChanges()
    expect(testComponet.fcontrol.value).toBe('12:19');

    inputEl.value = 'aaa44:19kkkkk';
    triggerChangeEvent(inputEl);
    fixture.detectChanges()
    expect(testComponet.fcontrol.value).toBe('23:19');

    inputEl.value = 'aaa1479kkkkk';
    triggerChangeEvent(inputEl);
    fixture.detectChanges()
    expect(testComponet.fcontrol.value).toBe('14:59');

    inputEl.value = '4419';
    triggerChangeEvent(inputEl);
    fixture.detectChanges()
    expect(testComponet.fcontrol.value).toBe('23:19');

    inputEl.value = '14:79';
    triggerChangeEvent(inputEl);
    fixture.detectChanges()
    expect(testComponet.fcontrol.value).toBe('14:59');
  });

  it('should not accept value in the format 21aabc39', () => {
    const inputEl: HTMLInputElement = inputDe.nativeElement;
    inputEl.value = '11aaaa43'; // numNumLetterLetter...numNum
    triggerChangeEvent(inputEl);
    fixture.detectChanges();
    expect(testComponet.fcontrol.value).toBe('');
  })
});
