import { Directive, Input, HostListener, ElementRef, OnDestroy } from '@angular/core';
import { OverlayRef, Overlay, HorizontalConnectionPos, VerticalConnectionPos, OverlayConfig } from '@angular/cdk/overlay';
import { RaOverlayPanelComponent } from '../overlay-panel.component';
import { first } from 'rxjs/operators';

@Directive({
  selector: '[raOverlayPanelTriggerFor]'
})
export class RaOverlayPanelTriggerDirective implements OnDestroy {
  @Input('raOverlayPanelTriggerFor')
  get panel(): RaOverlayPanelComponent {
    return this._panel;
  }
  set panel(panel: RaOverlayPanelComponent) {
    this._panel = panel;
  }
  private _panel: RaOverlayPanelComponent;

  overlayRef: OverlayRef;

  originX: HorizontalConnectionPos = 'end';
  originY: VerticalConnectionPos = 'bottom';
  overlayX: HorizontalConnectionPos = 'end';
  overlayY: VerticalConnectionPos = 'top';

  constructor(private overlay: Overlay,
              private elementRef: ElementRef) {}

  @HostListener('click') onClick() {
    this.toggle();
  }

  ngOnDestroy() {
    if(this.overlayRef) {
      this.close();
    }
  }

  private close() {
    this.overlayRef.dispose();
    this.overlayRef = null;
  }

  private toggle() {
    if(this.overlayRef) {
      this.close();
      return;
    }

    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this.elementRef)
      .withFlexibleDimensions(true)
      .withPush(true)
      .withPositions([{
        originX: this.originX,
        originY: this.originY,
        overlayX: this.overlayX,
        overlayY: this.overlayY
      }])

    const config = new OverlayConfig({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop'
    });

    this.overlayRef = this.overlay.create(config);

    const portal = this.panel.portal;
    this.overlayRef.attach(portal);
    this.overlayRef.backdropClick()
      .pipe(first())
      .subscribe(_ => this.close())
  }
}
