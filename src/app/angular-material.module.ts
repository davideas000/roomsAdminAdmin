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
  MatMenuModule,
  MatDatepickerModule,
  MatBadgeModule,
  MatChipsModule,
  MatDialogModule,
  MatSnackBarModule
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
    MatMenuModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatBadgeModule,
    MatChipsModule,
    MatDialogModule,
    MatSnackBarModule
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
    MatMenuModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatBadgeModule,
    MatChipsModule,
    MatDialogModule,
    MatSnackBarModule
  ]
})
export class RaAngularMaterialModule { }
