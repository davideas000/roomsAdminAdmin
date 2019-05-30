import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaMainComponent } from './main.component';
import { RaMainRoutingModule } from './main-routing.module';

@NgModule({
  declarations: [RaMainComponent],
  imports: [
    CommonModule,
    RaMainRoutingModule
  ]
})
export class RaMainModule { }
