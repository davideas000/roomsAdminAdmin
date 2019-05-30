import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaRoomsPagesComponent } from './rooms-pages.component';
import { RouterModule } from '@angular/router';
import { RaAngularMaterialModule } from 'src/app/angular-material.module';
import { RaHeaderModule } from '../header/header.module';
import { RaRoomsDetailsModule } from './rooms-details/rooms-details.module';

@NgModule({
  declarations: [
    RaRoomsPagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RaAngularMaterialModule,
    RaHeaderModule,
    RaRoomsDetailsModule
  ]
})
export class RaRoomsPagesModule { }
