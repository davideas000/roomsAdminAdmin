import { Component } from '@angular/core';

@Component({
  selector: 'ra-logo',
  template: `
    <svg class="logo">
      <use xlink:href="../../../assets/logo.svg#ra-logo"></use>
    </svg>
  `,
  styles: ['.logo {width: 100%; height: 100%}']
})
export class RaLogoComponent {}
