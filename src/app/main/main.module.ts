import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaMainComponent } from './main.component';
import { RaMainRoutingModule } from './main-routing.module';
import { RaRoomsPagesModule } from './rooms-pages/rooms-pages.module';
import { RaNewReservationModule } from './new-reservation/new-reservation.module';
import { RaReservationsPagesModule } from './reservations-pages/reservations-pages.module';
import { RaNotificationsPagesModule } from './notifications-pages/notifications-pages.module';
import { RaAngularMaterialModule } from '../angular-material.module';
import { RaSidenavInnerModule } from './sidenav-inner/sidenav-inner.module';
import { RaHeaderModule } from './header/header.module';
import { RaProfilePagesModule } from './profile-pages/profile-pages.module';

@NgModule({
  declarations: [RaMainComponent],
  imports: [
    CommonModule,
    RaAngularMaterialModule,
    RaMainRoutingModule,
    RaRoomsPagesModule,
    RaReservationsPagesModule,
    RaNotificationsPagesModule,
    RaNewReservationModule,
    RaSidenavInnerModule,
    RaHeaderModule,
    RaProfilePagesModule
  ]
})
export class RaMainModule { }
