import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaAngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    NotificationComponent
  ],
  imports: [
    CommonModule,
    RaAngularMaterialModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    NotificationComponent
  ]
})
export class RaNotificationsModule { }
