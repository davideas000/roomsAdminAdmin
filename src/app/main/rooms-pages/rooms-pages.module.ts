import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaRoomsPagesComponent } from './rooms-pages.component';
import { RouterModule } from '@angular/router';
import { RaAngularMaterialModule } from 'src/app/angular-material.module';
import { RaHeaderModule } from '../header/header.module';
import { RaRoomsDetailsModule } from './rooms-details/rooms-details.module';
import { RaRoomsAllComponent } from './rooms-all/rooms-all.component';
import { RaRoomsModule } from '../rooms/rooms.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    RaRoomsPagesComponent,
    RaRoomsAllComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RaAngularMaterialModule,
    RaHeaderModule,
    RaRoomsModule,
    RaRoomsDetailsModule,
    SharedModule
  ]
})
export class RaRoomsPagesModule { }
