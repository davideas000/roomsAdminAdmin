import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatInputModule, MatSidenavModule, MatButtonModule, MatSlideToggleModule, MatCardModule, MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatCardModule,
    MatProgressSpinnerModule
  ]
})
export class RaAngularMaterialModule { }
