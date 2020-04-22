import { Component, OnInit } from '@angular/core';
import {CourseData} from '../courseSubmit'
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-cs',
  templateUrl: './cs.component.html',
  styleUrls: ['./cs.component.css']
})
export class CSComponent implements OnInit {
    form: FormGroup;
    Courses: Array<CourseData> =[{CourseNum: 135, Dept: 'CSC', Name: "Computer Science 1"},
                                 {CourseNum: 125, Dept: 'CSC', Name: "Discrete Math 1"}]
    constructor(private fb: FormBuilder) {
      this.form = this.fb.group({
        checkArray: this.fb.array([])
      })
    }

  ngOnInit() {
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
  
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
}
