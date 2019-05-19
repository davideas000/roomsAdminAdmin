import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatInputModule, MatSidenavModule, MatButtonModule, MatSlideToggleModule, MatCardModule, MatProgressSpinnerModule, MatIconModule, MatListModule, MatRippleModule, MatDatepickerModule } from '@angular/material';
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
    MatIconModule,
    MatListModule,
    PortalModule,
    OverlayModule,
    MatRippleModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  exports: [
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatListModule,
    PortalModule,
    OverlayModule,
    MatRippleModule,
    MatDatepickerModule,
    MatMomentDateModule
  ]
})
export class RaAngularMaterialModule { }
