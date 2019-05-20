import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaMessagePanelComponent } from './message-panel.component';

describe('RaMessagePanelComponent', () => {
  let component: RaMessagePanelComponent;
  let fixture: ComponentFixture<RaMessagePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaMessagePanelComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaMessagePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should raise close event when `button.btn` is clicked', () => {
    component.close.subscribe(ev => expect(ev).toBe(true));
    const btnEl: HTMLButtonElement = fixture.nativeElement
      .querySelector('.btn');
    btnEl.click();
  });

  it('#type should set panel\'s CSS class', () => {
    // initially panel's css class should be 'message-panel-error'
    let container = fixture.nativeElement
      .querySelector('div.message-panel-error');
    expect(container).toBeTruthy();

    component.type = 'success';

    fixture.detectChanges();
    container = fixture.nativeElement
      .querySelector('div.message-panel-success');
    expect(container).toBeTruthy();
  });

  it('#closeButton should hide/show close button', () => {
    // default to true
    let btnEl: HTMLButtonElement = fixture.nativeElement
      .querySelector('button');
    expect(btnEl).toBeTruthy();

    component.closeButton = false;
    fixture.detectChanges();

    btnEl = fixture.nativeElement
      .querySelector('button');
    expect(btnEl).toBeFalsy();
  });

});
