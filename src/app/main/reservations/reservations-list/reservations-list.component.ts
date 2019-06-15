import { Component, Input } from '@angular/core';
import { RaApiService } from 'src/app/api.service';
import { RaConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { first } from 'rxjs/operators';
import { RaReservation } from 'src/app/models/reservation.model';
import { RaOperationResultNotificationComponent } from './operation-result-notification/operation-result-notification.component';

@Component({
  selector: 'ra-reservations-list',
  templateUrl: './reservations-list.component.html',
  styleUrls: ['./reservations-list.component.scss']
})
export class RaReservationsListComponent {
  @Input() reservations: RaReservation[];
  @Input('type') listtype: string;
  @Input() showTitle = true;
  @Input() showActions = true;
  @Input() actionButtons: string;
  @Input() showStatus = false;

  constructor(private apiService: RaApiService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {}

  remove(reservation: RaReservation) {
    const dialogRef = this.dialog.open(
      RaConfirmationDialogComponent,
      {data: {type: 'remove',
              showMessage: true,
              showTextarea: false}});

    dialogRef.afterClosed()
      .subscribe(r => {
        if(r) {
          this.apiService.removeReservation$(reservation)
            .pipe(first())
            .subscribe(
              _ => {
                this.reservations = this.reservations.filter(
                  v => v._id !== reservation._id
                );
                this.openSnackbar('removed');
              },
              _ => {
                this.openSnackbar('error');
              });
        }
      });
  }

  private openSnackbar(mtype: string) {
    let config: any = {data: {type: mtype}};
    if(mtype !== 'error') config.duration = 2000
    this.snackBar.openFromComponent(
      RaOperationResultNotificationComponent, config);
  }

}
