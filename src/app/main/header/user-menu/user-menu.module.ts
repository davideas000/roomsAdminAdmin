import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaUserMenuComponent } from './user-menu.component';
import { RaUserMenuNavComponent } from './user-menu-nav/user-menu-nav.component';
import { RaUserMenuUserComponent } from './user-menu-user/user-menu-user.component';
import { RaAngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RaUserMenuComponent, RaUserMenuNavComponent, RaUserMenuUserComponent],
  imports: [
    CommonModule,
    RaAngularMaterialModule,
    SharedModule,
    RouterModule
  ],
  exports: [RaUserMenuComponent]
})
export class RaUserMenuModule { }
