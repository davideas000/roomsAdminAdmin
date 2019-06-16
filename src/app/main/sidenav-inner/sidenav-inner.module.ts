import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RaNavigationComponent } from './navigation/navigation.component';
import { RaAngularMaterialModule } from 'src/app/angular-material.module';

@NgModule({
  declarations: [RaNavigationComponent],
  imports: [
    CommonModule,
    RouterModule,
    RaAngularMaterialModule
  ]
})
export class RaSidenavInnerModule { }
