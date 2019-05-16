import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RaNewReservationMessageComponent } from './new-reservation-message/new-reservation-message.component';

@NgModule({
  declarations: [
    RaNewReservationMessageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class RaNewReservationModule { }
