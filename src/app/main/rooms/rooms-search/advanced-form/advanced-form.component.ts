import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RaResponsiveService } from 'src/app/responsive.service';

@Component({
  selector: 'ra-advanced-form',
  templateUrl: './advanced-form.component.html',
  styleUrls: ['./advanced-form.component.scss']
})
export class RaAdvancedFormComponent {

  searchForm: FormGroup = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    startTime: new FormControl(''),
    endTime: new FormControl(''),
    type: new FormControl(''),
    department: new FormControl(''),
    width: new FormControl(''),
    length: new FormControl(''),
    capacity: new FormControl('')
  });

  @Output() search = new EventEmitter();
  @Output() cancel = new EventEmitter();

  @Input() types: string[];
  @Input() departments: Map<string, string>;

  constructor(public rs: RaResponsiveService) { }

  onSearch() {
    const f = this.searchForm.value;

    const data = {
      'width': f.width,
      'length': f.length,
      'capacity': f.capacity,
      'department': f.department,
      'type': f.type,
      'startDate': f.startDate && f.startDate.format('YYYY-MM-DD'),
      'endDate': f.endDate && f.endDate.format('YYYY-MM-DD'),
      'startTime': f.startTime,
      'endTime': f.endTime
    }

    this.search.emit(data);
  }

  onCancel() {
    this.cancel.emit();
  }

}
