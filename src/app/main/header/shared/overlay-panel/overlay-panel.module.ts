import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaOverlayPanelComponent } from './overlay-panel.component';
import { RaOverlayPanelTriggerDirective } from './overlay-panel-trigger/overlay-panel-trigger.directive';
import { RaAngularMaterialModule } from 'src/app/angular-material.module';

@NgModule({
  declarations: [RaOverlayPanelComponent, RaOverlayPanelTriggerDirective],
  imports: [
    CommonModule,
    RaAngularMaterialModule
  ],
  exports: [RaOverlayPanelComponent, RaOverlayPanelTriggerDirective]
})
export class OverlayPanelModule { }
