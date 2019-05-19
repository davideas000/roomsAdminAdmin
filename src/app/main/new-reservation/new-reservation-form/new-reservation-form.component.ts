import { Component, OnChanges, Input } from '@angular/core';
import { RaApiService } from 'src/app/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { RaRoom } from 'src/app/models/room.model';
import { first } from 'rxjs/operators';
import { RaNMessage, RaNMessageType, RaNMessageMsgType } from '../new-reservation-message/nmessage.model';
import { RaResponsiveService } from 'src/app/responsive.service';

@Component({
  selector: 'ra-new-reservation-form',
  templateUrl: './new-reservation-form.component.html',
  styleUrls: ['./new-reservation-form.component.scss']
})
export class RaNewReservationFormComponent implements OnChanges {
  @Input() room: RaRoom;

  processing = false;

  form: FormGroup = new FormGroup({
    room: new FormControl(''),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    startTime: new FormControl('', Validators.required),
    endTime: new FormControl('', Validators.required),
    reason: new FormControl('')
  });

  msgConfig = new RaNMessage();

  constructor(private apiService: RaApiService,
              private location: Location,
              private responsive: RaResponsiveService) {}

  ngOnChanges() {
    this.setRoomName();
  }

  setRoomName() {
    if (this.room) {
      let roominfo =
        `${this.room.name} (${this.room.type} - ${this.room.department.acronym})`;
      this.form.get('room').reset({value: roominfo, disabled: true});
    }
  }

  onFormSubmit() {
    let values = this.form.value;
    let room = this.room._id;

    this.clearMessage();

    const data: any = {
      startDate: values.startDate.format('YYYY-MM-DD'),
      endDate: values.endDate.format('YYYY-MM-DD'),
      startTime: values.startTime,
      endTime: values.endTime,
    };

    if (values.reason) {
      data.reason = values.reason;
    }

    data.room = room;

    this.processing = true;
    this.apiService.newReservation$(data)
      .pipe(first())
      .subscribe(
        _ => {
          this.processing = false;
          this.msgConfig.show = true;
          this.msgConfig.type = RaNMessageType.success;
          this.msgConfig.msgType = RaNMessageMsgType.success;
        },
        e => {
          this.processing = false;
          this.msgConfig.type = RaNMessageType.error;
          this.msgConfig.show = true;
          if (e.error.message &&
              e.error.message === 'overlapping-reservation') {
            this.msgConfig.msgType = RaNMessageMsgType.error;
          } else {
            this.msgConfig.msgType = RaNMessageMsgType.neterror;
          }
        }
      );
  }

  private clearMessage() {
    this.msgConfig.show = false;
  }

  onAlertDismiss() {
    this.clearMessage();
  }

  cancel() {
    this.form.reset();
    this.clearMessage();
    this.location.back();
  }

}
