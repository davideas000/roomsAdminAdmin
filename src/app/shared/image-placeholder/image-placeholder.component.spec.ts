import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaImagePlaceholderComponent } from './image-placeholder.component';

describe('RaImagePlaceholderComponent', () => {
  let component: RaImagePlaceholderComponent;
  let fixture: ComponentFixture<RaImagePlaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaImagePlaceholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaImagePlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
