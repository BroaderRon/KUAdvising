import { HttpService } from 'src/app/http.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/cur-user.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-it',
  templateUrl: './it.component.html',
  styleUrls: ['./it.component.css']
})
export class ITComponent implements OnInit {

  form: FormGroup;

  constructor(private _http: HttpService, private data: DataService, private fb: FormBuilder) { 
    this.form = this.fb.group({
    checkArray: this.fb.array([])})
  }

  ngOnInit() {
  }

  Data: Array<any> = [
    { name: 'CSC 125: DISCRETE MATH FOR CS I', CourseNum: '125', Dept: 'CSC' },
    { name: 'CSC 130: IT FUNDAMENTALS', CourseNum: '130', Dept: 'CSC' },
    { name: 'CSC 135: COMP SCI I', CourseNum: '135', Dept: 'CSC' },
    { name: 'CSC 136: COMP SCI II', CourseNum: '136', Dept: 'CSC' },
    { name: 'CSC 220: OO MULTIMEDIA PROG.', CourseNum: '220', Dept: 'CSC' },
    { name: 'CSC 223: ADVANCED SCIENTIFIC PROG. ', CourseNum: '223', Dept: 'CSC' },
    { name: 'CSC 242: WEB PROGRAMMING', CourseNum: '242', Dept: 'CSC' },
    { name: 'CSC 252: UNIX SCRIPTING AND ADMINISTRATION', CourseNum: '252', Dept: 'CSC' },
    { name: 'CSC 253: IT SYSTEMS', CourseNum: '253', Dept: 'CSC' },
    { name: 'CSC 273: COMPUTING SYSTEMS INTEGRATION', CourseNum: '273', Dept: 'CSC' },
    { name: 'CSC 311: COMPUTER NETWORKS', CourseNum: '311', Dept: 'CSC' },
    { name: 'CSC 341: INFORMATION SECURITY', CourseNum: '341', Dept: 'CSC' },
    { name: 'CSC 356: INTRODUCTION TO DATABASE SYS', CourseNum: '356', Dept: 'CSC' },
    { name: 'CSC 354: SOFTWARE ENGINEERING I', CourseNum: '354', Dept: 'CSC' },
    { name: 'CSC 355: SOFTWARE ENGINEERING II', CourseNum: '355', Dept: 'CSC' }
    
  ];

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
