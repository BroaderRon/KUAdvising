import { Component, OnInit } from '@angular/core';
import {CourseData} from '../courseSubmit'
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { DataService } from 'src/app/cur-user.service';
import { HttpService } from 'src/app/http.service';
import { EnrollData } from '../enrollSubmit';

@Component({
  selector: 'app-cs',
  templateUrl: './cs.component.html',
  styleUrls: ['./cs.component.css']
})
export class CSComponent implements OnInit {
    form: FormGroup;
    Courses: Array<CourseData> =[{CourseNum: 135, Dept: 'CSC', Name: "Computer Science 1"},
                                 {CourseNum: 125, Dept: 'CSC', Name: "Discrete Math 1"}]
  message: any;
    constructor(private fb: FormBuilder,private data: DataService,private _http: HttpService) {
      this.form = this.fb.group({
        checkArray: this.fb.array([])
      })
    }
    Enrolled: Map<any,EnrollData>;
  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);

   this.Enrolled = this.getEnroll()

  }

  onCheckboxChange(e,name,coursenum,dept,grade,semester) {
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
  getEnroll(){
    let temp = new Map<any, EnrollData>()
    this._http.getEnrolled(this.message).subscribe((data: EnrollData ) => {
     
    for(let i in data){
      if(data[i].Dept == 'CSC'){
        temp.set(data[i].CourseNum,data[i])
        console.log("ADDING: "+ data[i])
      }
    }
      //console.log(this.Enrolled);
    }
  );
  return temp;
  }
}