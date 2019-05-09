import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ra-image-slideshow',
  templateUrl: './image-slideshow.component.html',
  styleUrls: ['./image-slideshow.component.scss']
})
export class RaImageSlideshowComponent implements OnInit {
  @Input() images: string[];
  pos = 0;
  showOverlay: boolean = false;

  ngOnInit() {
    if (!this.images) this.images = [];
  }

  backward() {
    if (this.pos > 0) {
      this.pos--;
    } else {
      this.pos = this.images.length - 1;
    }
  }

  forward() {
    if (this.pos < this.images.length - 1) {
      this.pos++;
    } else {
      this.pos = 0;
    }
  }

  toggleOverlay() {
    this.showOverlay = !this.showOverlay;
  }

}
