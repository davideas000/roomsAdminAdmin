import { Pipe, PipeTransform, LOCALE_ID, Inject } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'relativeTime'
})
export class RaRelativeTimePipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) private locale) {}

  transform(time: string, lc?: string): string {
    moment.locale(lc || this.locale);
    return moment(time).fromNow();
  }

}
