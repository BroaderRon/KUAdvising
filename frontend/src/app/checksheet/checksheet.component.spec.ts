import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecksheetComponent } from './checksheet.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ChecksheetComponent', () => {
  let component: ChecksheetComponent;
  let fixture: ComponentFixture<ChecksheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecksheetComponent ],
      imports: [ReactiveFormsModule]
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
