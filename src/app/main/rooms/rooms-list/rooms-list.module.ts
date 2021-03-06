import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RaAngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RaRoomComponent } from './room/room.component';
import { RaRoomsListComponent } from './rooms-list.component';

@NgModule({
  declarations: [
    RaRoomComponent,
    RaRoomsListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RaAngularMaterialModule,
    SharedModule
  ],
  exports: [
    RaRoomComponent,
    RaRoomsListComponent
  ]
})
export class RaRoomsListModule { }
