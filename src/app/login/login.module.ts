import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RaLoginRoutingModule } from './login-routing.module';
import { RaAngularMaterialModule } from '../angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RaLoginFormComponent } from './login-form/login-form.component';
import { RaLoginErrorMessageComponent } from './login-error-message/login-error-message.component';

@NgModule({
  declarations: [RaLoginFormComponent, RaLoginErrorMessageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RaLoginRoutingModule,
    RaAngularMaterialModule,
    SharedModule
  ]
})
export class RaLoginModule { }
