import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatFormFieldModule,
  MatInputModule,
  MatSidenavModule,
  MatButtonModule,
  MatSlideToggleModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatRippleModule,
  MatDatepickerModule,
  MatBadgeModule
} from '@angular/material';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    PortalModule,
    OverlayModule,
    MatRippleModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatBadgeModule
  ],
  exports: [
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    PortalModule,
    OverlayModule,
    MatRippleModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatBadgeModule
  ]
})
export class RaAngularMaterialModule { }
