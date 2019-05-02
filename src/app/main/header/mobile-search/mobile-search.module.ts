import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaMobileSearchComponent } from './mobile-search.component';
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';
import { RaMobileSearchInputComponent } from './mobile-search-input/mobile-search-input.component';
import { RaAngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [RaMobileSearchComponent, RaMobileSearchInputComponent ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    RaAngularMaterialModule,
    SharedModule
  ],
  exports: [RaMobileSearchComponent]
})
export class RaMobileSearchModule { }
