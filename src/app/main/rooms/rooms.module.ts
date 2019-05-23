import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaAngularMaterialModule } from 'src/app/angular-material.module';
import { RaRoomsListModule } from './rooms-list/rooms-list.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RaAngularMaterialModule,
    RaRoomsListModule
  ],
  exports: [
    RaRoomsListModule
  ]
})
export class RaRoomsModule {}
