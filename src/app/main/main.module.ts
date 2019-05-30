import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaMainComponent } from './main.component';
import { RaMainRoutingModule } from './main-routing.module';
import { RaRoomsPagesModule } from './rooms-pages/rooms-pages.module';
import { RaNewReservationModule } from './new-reservation/new-reservation.module';

@NgModule({
  declarations: [RaMainComponent],
  imports: [
    CommonModule,
    RaMainRoutingModule,
    RaRoomsPagesModule,
    RaNewReservationModule
  ]
})
export class RaMainModule { }
