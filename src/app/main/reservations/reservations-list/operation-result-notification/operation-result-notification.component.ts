import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material';

@Component({
  selector: 'ra-operation-result-notification',
  templateUrl: './operation-result-notification.component.html',
  styleUrls: ['./operation-result-notification.component.scss']
})
export class RaOperationResultNotificationComponent {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public config,
    private ref: MatSnackBarRef<any>) {}

  close() {
    this.ref.dismiss();
  }

}
