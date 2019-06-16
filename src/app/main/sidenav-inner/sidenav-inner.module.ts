import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RaSidenavInnerComponent } from './sidenav-inner.component';
import { RaNavigationComponent } from './navigation/navigation.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RaHeaderModule } from '../header/header.module';
import { RaAngularMaterialModule } from 'src/app/angular-material.module';

@NgModule({
  declarations: [RaSidenavInnerComponent, RaNavigationComponent],
  imports: [
    CommonModule,
    RouterModule,
    RaAngularMaterialModule,
    SharedModule,
    RaHeaderModule
  ],
  exports: [RaSidenavInnerComponent]
})
export class RaSidenavInnerModule { }
