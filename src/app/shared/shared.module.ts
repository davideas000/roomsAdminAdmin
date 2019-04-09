import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaLogoComponent } from './logo.component';
import { RaMessagePanelComponent } from './message-panel/message-panel.component';

@NgModule({
  declarations: [RaLogoComponent, RaMessagePanelComponent],
  imports: [
    CommonModule
  ],
  exports: [RaLogoComponent, RaMessagePanelComponent]
})
export class SharedModule { }
