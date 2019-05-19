import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RaAngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RaNewReservationFormComponent } from './new-reservation-form/new-reservation-form.component';
import { RaNewReservationMessageComponent } from './new-reservation-message/new-reservation-message.component';

@NgModule({
  declarations: [
    RaNewReservationFormComponent,
    RaNewReservationMessageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RaAngularMaterialModule,
    SharedModule
  ]
})
export class RaNewReservationModule { }
