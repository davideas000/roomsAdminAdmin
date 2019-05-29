import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaAngularMaterialModule } from 'src/app/angular-material.module';
import { RaReservationsPanelHeaderComponent } from './reservations-panel-header/reservations-panel-header.component';

@NgModule({
  declarations: [
    RaReservationsPanelHeaderComponent
  ],
  imports: [
    CommonModule,
    RaAngularMaterialModule
  ]
})
export class RaRoomsDetailsModule { }
