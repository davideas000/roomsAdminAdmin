import { Component, ViewChild } from '@angular/core';
import { CdkPortal } from '@angular/cdk/portal';

@Component({
  selector: 'ra-overlay-panel',
  templateUrl: './overlay-panel.component.html',
  styleUrls: ['./overlay-panel.component.scss']
})
export class RaOverlayPanelComponent {
  @ViewChild(CdkPortal) private _portal: CdkPortal;
  get portal(): CdkPortal {
    return this._portal;
  }
}
