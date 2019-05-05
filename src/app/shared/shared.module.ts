import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaLogoComponent } from './logo.component';
import { RaMessagePanelComponent } from './message-panel/message-panel.component';
import { RaOverlaySpinnerComponent } from './overlay-spinner/overlay-spinner.component';
import { RaAngularMaterialModule } from '../angular-material.module';
import { RaUserPhotoComponent } from './user-photo/user-photo.component';
import { RaOverlayPanelModule } from './overlay-panel/overlay-panel.module';
import { RaRelativeTimePipe } from './relative-time.pipe';

@NgModule({
  declarations: [
    RaLogoComponent,
    RaMessagePanelComponent,
    RaOverlaySpinnerComponent,
    RaUserPhotoComponent,
    RaRelativeTimePipe
  ],
  imports: [
    CommonModule,
    RaAngularMaterialModule,
    RaOverlayPanelModule
  ],
  exports: [
    RaLogoComponent,
    RaMessagePanelComponent,
    RaOverlaySpinnerComponent,
    RaUserPhotoComponent,
    RaOverlayPanelModule,
    RaRelativeTimePipe
  ]
})
export class SharedModule { }
