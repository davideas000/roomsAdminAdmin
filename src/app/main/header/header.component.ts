import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { RaResponsiveService } from 'src/app/responsive.service';

@Component({
  selector: 'ra-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class RaHeaderComponent implements OnInit {
  @Input() showBackButton: boolean;
  @Input() showNotificationsIcon: boolean = true;
  @Output() menuButtonClick = new EventEmitter<boolean>();
  title: string;

  constructor(private location: Location,
              private titleService: Title,
              public rs: RaResponsiveService) { }

  ngOnInit() {
    this.title = this.titleService.getTitle()
  }

  toggleSNav() {
    this.menuButtonClick.emit(true);
  }

  navigateBack() {
    this.location.back();
  }

}
