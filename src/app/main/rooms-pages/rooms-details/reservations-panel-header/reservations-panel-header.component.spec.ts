import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaReservationsPanelHeaderComponent } from './reservations-panel-header.component';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';

@Component({
  selector: 'mat-menu',
  template: '<ng-content></ng-content>',
  exportAs: 'matMenu'
})
class FakeMenu {}

describe('RaReservationsPanelHeaderComponent', () => {
  let component: RaReservationsPanelHeaderComponent;
  let fixture: ComponentFixture<RaReservationsPanelHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaReservationsPanelHeaderComponent,
                      FakeMenu ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaReservationsPanelHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#menuSelectedItem should define the item selected in the menu',
     () => {
       // default to all
       const selectedMenu: HTMLElement = fixture.nativeElement
         .querySelector('div > button span');

       expect(component.menuSelectedItem).toBe('all');
       expect(selectedMenu.textContent).toBe('Todos');

       // today
       component.menuSelectedItem = 'today';
       fixture.detectChanges();
       expect(selectedMenu.textContent).toBe('Hoje');

       // month
       component.menuSelectedItem = 'month';
       fixture.detectChanges();
       expect(selectedMenu.textContent).toBe('Este mês');

       // year
       component.menuSelectedItem = 'year';
       fixture.detectChanges();
       expect(selectedMenu.textContent).toBe('Este ano');
     });

  it('#menuItems should define the menu items', () => {
    const menuOptions: NodeList = fixture.nativeElement
      .querySelectorAll('mat-menu button');

    expect(menuOptions[0].textContent).toBe('Hoje');
    expect(menuOptions[1].textContent).toBe('Este mês');
    expect(menuOptions[2].textContent).toBe('Este ano');
    expect(menuOptions[3].textContent).toBe('Todos');

  });

  it('should raise a filter event when the item selected '
     + 'in the menu is changes', () => {
       let eventResult = '';

       component.filter.subscribe(r => eventResult = r);

       const menuOptions: NodeList = fixture.nativeElement
         .querySelectorAll('mat-menu button');

       // option 1 is month
       menuOptions[1].dispatchEvent(new Event('click'));

       expect(eventResult).toBe('month');
       expect(component.menuSelectedItem).toBe('month');

       // option 1 is today
       menuOptions[0].dispatchEvent(new Event('click'));

       expect(eventResult).toBe('today');
       expect(component.menuSelectedItem).toBe('today');

     });

});
