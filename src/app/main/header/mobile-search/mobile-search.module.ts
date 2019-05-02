import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { RaMobileSearchInputComponent } from './mobile-search-input/mobile-search-input.component';

@NgModule({
  declarations: [RaMobileSearchInputComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class RaMobileSearchModule { }
