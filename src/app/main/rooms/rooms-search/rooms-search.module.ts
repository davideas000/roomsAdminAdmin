import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaRoomsSearchComponent } from './rooms-search.component';
import { RaAngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RaSimpleFormComponent } from './simple-form/simple-form.component';
import { RaAdvancedFormComponent } from './advanced-form/advanced-form.component';

@NgModule({
  declarations: [
    RaRoomsSearchComponent,
    RaSimpleFormComponent,
    RaAdvancedFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RaAngularMaterialModule,
    SharedModule
  ],
  exports: [ RaRoomsSearchComponent ]
})
export class RaRoomsSearchModule { }
