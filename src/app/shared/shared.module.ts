import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaLogoComponent } from './logo.component';

@NgModule({
  declarations: [RaLogoComponent],
  imports: [
    CommonModule
  ],
  exports: [RaLogoComponent]
})
export class SharedModule { }
