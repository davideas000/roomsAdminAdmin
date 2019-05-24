import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaReservationsListModule } from './reservations-list/reservations-list.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RaReservationsListModule
  ],
  exports: [
    RaReservationsListModule
  ]
})
export class RaReservationsModule { }
