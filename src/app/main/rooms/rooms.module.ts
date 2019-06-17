import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaAngularMaterialModule } from 'src/app/angular-material.module';
import { RaRoomsListModule } from './rooms-list/rooms-list.module';
import { RaRoomsSearchModule } from './rooms-search/rooms-search.module';

@NgModule({
  imports: [
    CommonModule,
    RaAngularMaterialModule,
    RaRoomsListModule,
    RaRoomsSearchModule
  ],
  exports: [
    RaRoomsListModule,
    RaRoomsSearchModule
  ]
})
export class RaRoomsModule {}
