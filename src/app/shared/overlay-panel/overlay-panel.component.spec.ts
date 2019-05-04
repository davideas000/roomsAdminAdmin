import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaOverlayPanelComponent } from './overlay-panel.component';
import { PortalModule } from '@angular/cdk/portal';

describe('RaOverlayPanelComponent', () => {
  let component: RaOverlayPanelComponent;
  let fixture: ComponentFixture<RaOverlayPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaOverlayPanelComponent ],
      imports: [PortalModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaOverlayPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#portal should be valid', () => {
    expect(component.portal).toBeTruthy();
  });
});
