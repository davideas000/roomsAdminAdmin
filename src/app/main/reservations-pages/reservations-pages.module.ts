import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaAngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RaReservationsModule } from '../reservations/reservations.module';
import { RaRoomsModule } from '../rooms/rooms.module';
import { RaReservationsListWrapperComponent } from './reservations-list-wrapper/reservations-list-wrapper.component';
import { RaReservationsPagesInnerComponent } from './reservations-pages-inner/reservations-pages-inner.component';

@NgModule({
  declarations: [
    RaReservationsListWrapperComponent,
    RaReservationsPagesInnerComponent,
  ],
  imports: [
    CommonModule,
    RaAngularMaterialModule,
    SharedModule,
    RaReservationsModule,
    RaRoomsModule
  ]
})
export class RaReservationsPagesModule { }
