import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaFileInputComponent } from './file-input.component';

describe('FileInputComponent', () => {
  let component: RaFileInputComponent;
  let fixture: ComponentFixture<RaFileInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaFileInputComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaFileInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.inputEl).toBeTruthy();
  });

  it('should emit a `fileInputChange` event when `<input type=file`> '
     + 'changes', () => {
       let eventR: boolean;
       component.fileInputChange.subscribe(
         r => eventR = true,
         e => fail('should not fail')
       );

       const fakeFilename = 'fakefile';
       component.inputEl = {
         nativeElement: {
           files: [{name: fakeFilename}]
         }
       };

       const inputEl: HTMLInputElement = fixture.nativeElement
         .querySelector('input');
       inputEl.value = '';
       inputEl.dispatchEvent(new Event('change'));

       expect(eventR).toBe(true);
       expect(component.filename).toBe(fakeFilename);
     });

  it('click on `div.ra-file-input-fake-input` should invoke `click()` on the '
     + 'native input element', () => {
       // invoking click() on the native element should open the
       // file selector

       const clickSpy = jasmine.createSpy('click()');
       component.inputEl = {
         nativeElement: {
           click: clickSpy
         }
       };

       const fakeFileInput: HTMLElement = fixture.nativeElement
         .querySelector('div.ra-file-input-fake-input');
       fakeFileInput.dispatchEvent(new Event('click'));

       expect(clickSpy).toHaveBeenCalledTimes(1);
     });

  it('#filename should show/hide the name of the selected file',
     () => {
       const fakename = 'fakename';
       component.filename = fakename;
       fixture.detectChanges();

       const filenameDisplayEl: HTMLElement = fixture.nativeElement
         .querySelector('.filename-wrapper span');

       expect(filenameDisplayEl.textContent).toBe(fakename);
     });

  it('should display a message informing the user when there is'
     + 'no selected file', () => {
       // when there isn't a input file, #filename is null or undefined
       expect(component.filename).toBeFalsy();

       const noFileMessage: HTMLElement = fixture.nativeElement
         .querySelector('.ra-file-input-fake-input > span');

       expect(noFileMessage).toBeTruthy();
       expect(noFileMessage.textContent).toBe(
         'Adicionar foto' // no input file
       );
     });

  it('click on the clear button should emit a `fileInputEvent` ' +
     'with the value of null and set #filename to null', () => {
       // used to confirm the event occurred
       let eventR: boolean;
       component.fileInputChange.subscribe(_ => eventR = true);

       // the clear button only appears when #filename is not null
       component.filename = "fakename";
       fixture.detectChanges(); // update DOM
       const clearBtn: HTMLButtonElement = fixture.nativeElement
         .querySelector('button.ra-file-input-clear-btn');

       expect(clearBtn).toBeTruthy();

       clearBtn.dispatchEvent(new Event('click'));

       expect(component.filename).toBeFalsy();
       expect(eventR).toBeTruthy();
     });
});
