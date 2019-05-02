import { ElementRef, ViewChild, OnInit, AfterViewInit, Component,
         Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeWhile, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'ra-mobile-search-input',
  templateUrl: './mobile-search-input.component.html',
  styleUrls: ['./mobile-search-input.component.scss']
})
export class RaMobileSearchInputComponent implements OnInit, AfterViewInit {
  @Output() raChange = new EventEmitter<string>();
  @ViewChild('input') inputEl: ElementRef;
  private searchControl = new FormControl();

  private alive: boolean;

  get value() {return this.searchControl.value};

  ngOnInit() {
    this.alive = true;
    this.searchControl.valueChanges
      .pipe(
        takeWhile(_ => this.alive),
        debounceTime(400),
        distinctUntilChanged(),
      )
      .subscribe(this.raChange);
  }

  ngOnDestroy() {
    this.alive = false;
  }

  ngAfterViewInit() {
    this.focus();
  }

  focus() {
    this.inputEl.nativeElement.focus();
  }

  reset() {
    this.searchControl.reset();
  }
}
