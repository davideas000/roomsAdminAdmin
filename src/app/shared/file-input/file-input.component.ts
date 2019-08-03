import { Component, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ra-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class RaFileInputComponent {

  @ViewChild('input') inputEl: ElementRef;
  @Output() fileInputChange = new EventEmitter<File>();

  filename: string;

  onChange() {
    this.fileInputChange.emit(
      this.inputEl.nativeElement.files[0]
    );

    this.filename = this.inputEl.nativeElement.files[0].name;
  }

  onClick() {
    this.inputEl.nativeElement.click();
  }

  onClear(ev) {
    ev.stopPropagation();
    this.fileInputChange.emit(null);
    this.filename = null;
  }

}
