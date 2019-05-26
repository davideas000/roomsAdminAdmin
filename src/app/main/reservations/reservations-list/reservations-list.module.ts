import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RaAngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RaReservationComponent } from './reservation/reservation.component';
import { RaReservationsListComponent } from './reservations-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RaOperationResultNotificationComponent } from './operation-result-notification/operation-result-notification.component';

@NgModule({
  declarations: [
    RaReservationsListComponent,
    RaReservationComponent,
    RaOperationResultNotificationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    RaAngularMaterialModule,
    SharedModule
  ],
  exports: [
    RaReservationsListComponent,
    RaReservationComponent
  ],
  entryComponents: [
    RaOperationResultNotificationComponent
  ]
})
export class RaReservationsListModule { }
