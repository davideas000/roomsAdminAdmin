import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RaAngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RaReservationComponent } from './reservation/reservation.component';

@NgModule({
  declarations: [
    RaReservationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RaAngularMaterialModule,
    SharedModule
  ],
  exports: [
    RaReservationComponent
  ]
})
export class RaReservationsListModule { }
