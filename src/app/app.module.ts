import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RaLoginModule } from './login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RaMainModule } from './main/main.module';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RaLoginModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RaMainModule
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'pt'} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
