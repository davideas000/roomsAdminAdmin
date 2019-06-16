import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaMainComponent } from './main.component';
import { RaMainRoutingModule } from './main-routing.module';
import { RaRoomsPagesModule } from './rooms-pages/rooms-pages.module';
import { RaNewReservationModule } from './new-reservation/new-reservation.module';
import { RaSidenavInnerModule } from './sidenav-inner/sidenav-inner.module';

@NgModule({
  declarations: [RaMainComponent],
  imports: [
    CommonModule,
    RaMainRoutingModule,
    RaRoomsPagesModule,
    RaNewReservationModule,
    RaSidenavInnerModule
  ]
})
export class RaMainModule { }
