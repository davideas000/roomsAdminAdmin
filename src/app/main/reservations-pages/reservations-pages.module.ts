import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaAngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RaReservationsApprovedComponent } from './reservations-approved/reservations-approved.component';
import { RaReservationsPendingComponent } from './reservations-pending/reservations-pending.component';
import { RaReservationsModule } from '../reservations/reservations.module';
import { RaRoomsModule } from '../rooms/rooms.module';
import { RaReservationsListWrapperComponent } from './reservations-list-wrapper/reservations-list-wrapper.component';
import { RaReservationsPagesInnerComponent } from './reservations-pages-inner/reservations-pages-inner.component';
import { RaReservationsApprovedDepComponent } from './reservations-approved-dep/reservations-approved-dep.component';
import { RaReservationsPendingDepComponent } from './reservations-pending-dep/reservations-pending-dep.component';

@NgModule({
  declarations: [
    RaReservationsListWrapperComponent,
    RaReservationsPagesInnerComponent,
    RaReservationsApprovedComponent,
    RaReservationsPendingComponent,
    RaReservationsApprovedDepComponent,
    RaReservationsPendingDepComponent
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
