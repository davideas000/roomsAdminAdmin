import { Component, Input } from '@angular/core';
import { RaApiService } from 'src/app/api.service';
import { RaConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { first } from 'rxjs/operators';
import { RaReservation } from 'src/app/models/reservation.model';
import { RaOperationResultNotificationComponent } from './operation-result-notification/operation-result-notification.component';

type ReservationEvents = 'approve' | 'remove' | 'reject';

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
  @Input() showTextareaOnRemove = false;

  constructor(private apiService: RaApiService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {}

  onAction(ev: ReservationEvents, reservation: RaReservation) {
    let config: {
      type: string,
      showMessage: boolean,
      showTextarea: boolean
    };

    switch(ev) {
      case 'approve':
        config = {type: 'approve',
                  showMessage: false,
                  showTextarea: false};
        break;
      case 'remove':
        config = {type: 'remove',
                  showMessage: true,
                  showTextarea: this.showTextareaOnRemove};
        break;
      case 'reject':
        config = {type: 'reject',
                  showMessage: false,
                  showTextarea: true};
        break;
    }

    const dialogRef = this.dialog.open(
      RaConfirmationDialogComponent,
      {data: config});

    dialogRef.afterClosed()
      .subscribe(r => {
        if(r) {
          this.operation(ev, reservation, r[1]);
        }
      });
  }

  private operation(otype: ReservationEvents, reserv, reason?: string) {
    let operation$;
    switch(otype) {
      case 'approve':
        operation$ = this.apiService.approveReservation$(reserv);
        break;
      case 'remove':
        operation$ = this.apiService.removeReservation$(reserv, reason);
        break;
      case 'reject':
        operation$ = this.apiService.rejectReservation$(reserv, reason);
        break;
    }

    operation$.pipe(first())
      .subscribe(
        _ => {
          this.reservations = this.reservations.filter(
            v => v._id !== reserv._id
          );
          this.openSnackbar(otype);
        },
        _ => {
          this.openSnackbar('error');
        });
  }

  private openSnackbar(mtype: string) {
    let config: any = {data: {type: mtype}};
    if(mtype !== 'error') config.duration = 2000
    this.snackBar.openFromComponent(
      RaOperationResultNotificationComponent, config);
  }

}
