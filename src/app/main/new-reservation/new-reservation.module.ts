import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RaNewReservationComponent } from './new-reservation.component';
import { RaAngularMaterialModule } from 'src/app/angular-material.module';
import { RaHeaderModule } from '../header/header.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RaNewReservationFormComponent } from './new-reservation-form/new-reservation-form.component';
import { RaNewReservationMessageComponent } from './new-reservation-message/new-reservation-message.component';

@NgModule({
  declarations: [
    RaNewReservationComponent,
    RaNewReservationFormComponent,
    RaNewReservationMessageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RaAngularMaterialModule,
    RaHeaderModule,
    SharedModule
  ]
})
export class RaNewReservationModule { }
