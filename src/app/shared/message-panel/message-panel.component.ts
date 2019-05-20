import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'ra-message-panel',
  templateUrl: './message-panel.component.html',
  styleUrls: ['./message-panel.component.scss']
})
export class RaMessagePanelComponent implements OnInit {
  @Output() close = new EventEmitter<boolean>();
  @Input() type = 'error';
  @Input() closeButton = true;

  constructor() { }

  ngOnInit() {
  }

  closeEvent() {
    this.close.emit(true);
  }

}
