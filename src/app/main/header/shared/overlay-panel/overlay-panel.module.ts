import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaOverlayPanelComponent } from './overlay-panel.component';
import { RaAngularMaterialModule } from 'src/app/angular-material.module';

@NgModule({
  declarations: [RaOverlayPanelComponent],
  imports: [
    CommonModule,
    RaAngularMaterialModule
  ],
  exports: [RaOverlayPanelComponent]
})
export class OverlayPanelModule { }
