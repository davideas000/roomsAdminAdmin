import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaAngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RaAdvancedFormComponent } from './advanced-form/advanced-form.component';

@NgModule({
  declarations: [
    RaAdvancedFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RaAngularMaterialModule,
    SharedModule
  ],
})
export class RaRoomsSearchModule { }
