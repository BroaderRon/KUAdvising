import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecksheetComponent } from './checksheet.component';

describe('ChecksheetComponent', () => {
  let component: ChecksheetComponent;
  let fixture: ComponentFixture<ChecksheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecksheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecksheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
