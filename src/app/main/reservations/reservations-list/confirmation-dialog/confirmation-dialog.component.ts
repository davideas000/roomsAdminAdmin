import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class RaConfirmationDialogComponent {
  reason = new FormControl('');

  constructor(@Inject(MAT_DIALOG_DATA) public config: any ) {}
}
