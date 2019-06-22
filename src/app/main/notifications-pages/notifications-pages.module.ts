import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaNotificationsDetailsComponent } from './notifications-details/notifications-details.component';
import { RouterModule } from '@angular/router';
import { RaAngularMaterialModule } from 'src/app/angular-material.module';
import { RaNotificationsModule } from '../notifications/notifications.module';
import { RaReservationsModule } from '../reservations/reservations.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    RaNotificationsDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RaAngularMaterialModule,
    RaNotificationsModule,
    RaReservationsModule,
    SharedModule
  ]
})
export class RaNotificationsPagesModule { }
