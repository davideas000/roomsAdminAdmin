import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ra-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.scss']
})
export class RaSimpleFormComponent implements OnInit, OnDestroy {

  searchForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    type: new FormControl(''),
    department: new FormControl('')
  });

  formSub_$: Subscription;

  @Output() search = new EventEmitter();

  @Input() types: string[];
  @Input() departments: Map<string, string>;

  ngOnInit() {
    this.formSub_$ = this.searchForm.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(v => {
        this.onSearch(v);
      });
  }

  ngOnDestroy() {
    this.formSub_$.unsubscribe();
  }

  onSearch(v) {
    const data = {
      'name': v.name,
      'department': v.department,
      'type': v.type
    }

    this.search.emit(data);
  }
}
