import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RaLoginRoutingModule } from './login-routing.module';
import { RaAngularMaterialModule } from '../angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RaLoginFormComponent } from './login-form/login-form.component';

@NgModule({
  declarations: [RaLoginFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RaLoginRoutingModule,
    RaAngularMaterialModule,
  ]
})
export class RaLoginModule { }
