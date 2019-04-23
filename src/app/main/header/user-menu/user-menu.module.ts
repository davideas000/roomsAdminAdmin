import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaUserMenuNavComponent } from './user-menu-nav/user-menu-nav.component';
import { RaAngularMaterialModule } from 'src/app/angular-material.module';

@NgModule({
  declarations: [RaUserMenuNavComponent],
  imports: [
    CommonModule,
    RaAngularMaterialModule,
  ]
})
export class RaUserMenuModule { }
