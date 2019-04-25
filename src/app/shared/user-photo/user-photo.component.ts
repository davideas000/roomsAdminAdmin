import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ra-user-photo',
  templateUrl: './user-photo.component.html',
  styleUrls: ['./user-photo.component.scss']
})
export class RaUserPhotoComponent implements OnInit {
  styles: any;
  @Input() photoURL: string;

  _size: number;
  @Input() set size(size: number) {
    this._size = size;
    this.updateStyles();
  };

  ngOnInit() {
    if (!this._size) this._size = 50;
    this.updateStyles();
  }

  private updateStyles() {
    this.styles = {
      'width.px': this._size,
      'height.px': this._size,
      'font-size.px': this._size,
      'border-radius.%': 50
    };
  }

}
