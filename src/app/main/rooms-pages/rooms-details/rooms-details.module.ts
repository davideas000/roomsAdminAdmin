import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RaAngularMaterialModule } from 'src/app/angular-material.module';
import { RaReservationsModule } from '../../reservations/reservations.module';
import { RaReservationsPanelComponent } from './reservations-panel/reservations-panel.component';
import { RaReservationsPanelHeaderComponent } from './reservations-panel-header/reservations-panel-header.component';

@NgModule({
  declarations: [
    RaReservationsPanelComponent,
    RaReservationsPanelHeaderComponent
  ],
  imports: [
    CommonModule,
    RaAngularMaterialModule,
    RaReservationsModule,
    SharedModule
  ]
})
export class RaRoomsDetailsModule { }
