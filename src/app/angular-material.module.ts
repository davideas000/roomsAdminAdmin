import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatInputModule, MatSidenavModule, MatButtonModule, MatSlideToggleModule, MatCardModule, MatProgressSpinnerModule, MatIconModule, MatListModule, MatRippleModule } from '@angular/material';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';

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
    MatRippleModule
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
    MatRippleModule
  ]
})
export class RaAngularMaterialModule { }
