import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaAngularMaterialModule } from 'src/app/angular-material.module';
import { RaReservationsModule } from '../reservations/reservations.module';
import { RaRoomsModule } from '../rooms/rooms.module';
import { RaReservationsListWrapperComponent } from './reservations-list-wrapper/reservations-list-wrapper.component';

@NgModule({
  declarations: [
    RaReservationsListWrapperComponent
  ],
  imports: [
    CommonModule,
    RaAngularMaterialModule,
    RaReservationsModule,
    RaRoomsModule
  ]
})
export class RaReservationsPagesModule { }
