import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaRoomsListModule } from './rooms-list/rooms-list.module';
import { RaRoomsSearchModule } from './rooms-search/rooms-search.module';

@NgModule({
  imports: [
    CommonModule,
    RaRoomsListModule,
    RaRoomsSearchModule
  ],
  exports: [
    RaRoomsListModule,
    RaRoomsSearchModule
  ]
})
export class RaRoomsModule {}
