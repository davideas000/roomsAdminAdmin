import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { RaResponsiveService } from 'src/app/responsive.service';
import { RaHeaderTitleService } from './header-title.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ra-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class RaHeaderComponent implements OnInit, OnDestroy {
  @Input() showBackButton: boolean;
  @Input() showNotificationsIcon: boolean = true;
  @Output() menuButtonClick = new EventEmitter<boolean>();
  title: string;
  headerTitle_$: Subscription;

  constructor(private location: Location,
              private titleService: RaHeaderTitleService,
              public rs: RaResponsiveService) { }

  ngOnInit() {
    this.headerTitle_$ = this.titleService.headerTitle$
      .subscribe(title => this.title = title);
  }

  ngOnDestroy() {
    this.headerTitle_$.unsubscribe();
  }

  toggleSNav() {
    this.menuButtonClick.emit(true);
  }

  navigateBack() {
    this.location.back();
  }

}
