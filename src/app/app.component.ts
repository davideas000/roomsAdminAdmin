import { Component } from '@angular/core';
import { RaThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public theme: RaThemeService) {}
}
