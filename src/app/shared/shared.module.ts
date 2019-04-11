import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaLogoComponent } from './logo.component';
import { RaMessagePanelComponent } from './message-panel/message-panel.component';
import { RaOverlaySpinnerComponent } from './overlay-spinner/overlay-spinner.component';
import { RaAngularMaterialModule } from '../angular-material.module';

@NgModule({
  declarations: [RaLogoComponent, RaMessagePanelComponent, RaOverlaySpinnerComponent],
  imports: [
    CommonModule,
    RaAngularMaterialModule
  ],
  exports: [RaLogoComponent, RaMessagePanelComponent, RaOverlaySpinnerComponent]
})
export class SharedModule { }
