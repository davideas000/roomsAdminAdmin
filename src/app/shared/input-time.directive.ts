import { Directive, Input, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[raInputTime]'
})
export class RaInputTimeDirective {

  @Input('raInputTime') private fControl: FormControl;

  constructor() { }

  @HostListener('change') private onChange() {
    const value: string = this.fControl.value;
    const match = value.match(/(\d{2}):?(\d{2})/);
    if (match) {
      const hh = parseInt(match[1]) < 24 ? match[1] : 23;
      const mm = parseInt(match[2]) < 60 ? match[2] : 59;
      this.fControl.setValue(`${hh}:${mm}`);
    } else {
      this.fControl.setValue('');
    }
  }

}
