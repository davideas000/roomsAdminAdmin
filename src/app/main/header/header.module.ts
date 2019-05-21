import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaHeaderComponent } from './header.component';
import { RaAngularMaterialModule } from 'src/app/angular-material.module';
import { RaUserMenuModule } from './user-menu/user-menu.module';
import { RaMobileSearchModule } from './mobile-search/mobile-search.module';
import { RaNotificationsModule } from '../notifications/notifications.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RaHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    RaAngularMaterialModule,
    RaUserMenuModule,
    RaMobileSearchModule,
    RaNotificationsModule
  ],
  exports: [
    RaHeaderComponent,
    RaUserMenuModule
  ]
})
export class RaHeaderModule { }
