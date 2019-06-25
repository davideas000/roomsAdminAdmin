import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaAngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { RaProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    RaProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RaAngularMaterialModule,
    SharedModule
  ]
})
export class RaProfilePagesModule { }
