import { Component, OnInit } from '@angular/core';
import {CourseData} from '../courseSubmit'
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { DataService } from 'src/app/cur-user.service';
import { HttpService } from 'src/app/http.service';
import { EnrollData, EnrollResData } from '../enrollSubmit';

@Component({
  selector: 'app-cs',
  templateUrl: './cs.component.html',
  styleUrls: ['./cs.component.css']
})
export class CSComponent implements OnInit {
    form: FormGroup;
    enableStat: Array<boolean>;
    Courses: Array<CourseData> =[{CourseNum: 125, Dept: 'CSC', Name: "Discrete Math 1"},
                                 {CourseNum: 225, Dept: 'CSC', Name: "Discrete Math 2"},
                                 {CourseNum: 135, Dept: 'CSC', Name: "Computer Science 1"},
                                 {CourseNum: 136, Dept: 'CSC', Name: "Computer Science 1"},
                                 {CourseNum: 235, Dept: 'CSC', Name: "COMP ORG & ASSEMBLY LANG"},
                                 {CourseNum: 237, Dept: 'CSC', Name: "Data Structures"},
                                 {CourseNum: 310, Dept: 'CSC', Name: "Programming Languages"},
                                 {CourseNum: 328, Dept: 'CSC', Name: "Network Programming"},
                                 {CourseNum: 343, Dept: 'CSC', Name: "Operating Systems"},
                                 {CourseNum: 354, Dept: 'CSC', Name: "Software Engineering 1"},
                                 {CourseNum: 355, Dept: 'CSC', Name: "Software Engineering 2"},]
  message: any;
  isDisabled: boolean;
    constructor(private fb: FormBuilder,private data: DataService,private _http: HttpService) {
      this.form = this.fb.group({
        checkArray: this.fb.array([])
      })
    }
    Enrolled: Map<any,EnrollData>;
  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
    this.isDisabled=true;
   this.Enrolled = this.getEnroll()
   var tmp = new Array<boolean>();
   for(let i in this.Courses){
     tmp.push(true);
   }
   this.enableStat = tmp;
  }

  onCheckboxChange(e,name,coursenum,dept,grade,semester,box,cat) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
    console.log(name)
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
      this.submitEnroll(name,coursenum,dept,grade,semester,box,cat)
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
  toggle(index){
    if(this.enableStat[index]){
      this.enableStat[index] = false;
    }
    else{
      this.enableStat[index] = true
    }
  }
  submitEnroll(name,coursenum: number,dept,grade,semester,box,cat){
    console.log(semester)
      var enrollSub = new EnrollData
      enrollSub.sid = this.message
      enrollSub.Dept = dept
      enrollSub.CourseNum = coursenum
      enrollSub.Cat = cat
      enrollSub.Grade = grade
      enrollSub.Semester = semester
      this._http.postEnroll(enrollSub).subscribe((res: EnrollResData)=> {
        let eResData = res;
        console.log(eResData.RESULT)
        if(eResData.RESULT == 'FALSE'){
          var courseSub = new CourseData;
          courseSub.CourseNum = coursenum
          courseSub.Dept = dept
          courseSub.Name = name
          this._http.postCourse(courseSub).subscribe((res: CourseData) =>{
            console.log(res);
            this.submitEnroll(name,coursenum,dept,grade,semester,box,cat)
          })
          
        }
        
      });
  }
}