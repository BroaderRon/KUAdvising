import { Component, OnInit, Input } from '@angular/core';
import { DataService } from "../cur-user.service";
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from '../http.service';
import {EnrollData,EnrollResData} from './enrollSubmit'
import {CourseData} from './courseSubmit'


@Component({
  selector: 'app-checksheet',
  templateUrl: './checksheet.component.html',
  styleUrls: ['./checksheet.component.css']
  
})

export class ChecksheetComponent implements OnInit {
  constructor(private data: DataService,private _http: HttpService) { }
  message;
  Enrolled: Object;
  courseN: Object;
  eResData: EnrollResData;
  cResData: CourseData;
  filledCourses: Map<any,any>;

  sheet = new FormGroup({
      AD1: new FormControl(''),
      AC1: new FormControl(''),
      AN1: new FormControl(''),
      AD2: new FormControl(''),
      AC2: new FormControl(''),
      AN2: new FormControl(''),
      AD3: new FormControl(''),
      AC3: new FormControl(''),
      AN3: new FormControl(''),
      AD4: new FormControl(''),
      AC4: new FormControl(''),
      AN4: new FormControl(''),
    //B
      BD1: new FormControl(''),
      BC1: new FormControl(''),
      BN1: new FormControl(''),
      BD2: new FormControl(''),
      BC2: new FormControl(''),
      BN2: new FormControl(''),
      BD3: new FormControl(''),
      BC3: new FormControl(''),
      BN3: new FormControl(''),
    //C
      CD1: new FormControl(''),
      CC1: new FormControl(''),
      CN1: new FormControl(''),
      CD2: new FormControl(''),
      CC2: new FormControl(''),
      CN2: new FormControl(''),
      CD3: new FormControl(''),
      CC3: new FormControl(''),
      CN3: new FormControl(''),
    //D
      DD1: new FormControl(''),
      DC1: new FormControl(''),
      DN1: new FormControl(''),
      DD2: new FormControl(''),
      DC2: new FormControl(''),
      DN2: new FormControl(''),
      DD3: new FormControl(''),
      DC3: new FormControl(''),
      DN3: new FormControl('')
  })
  
  
  ngOnInit() {
    //used to get selected student
    this.data.currentMessage.subscribe(message => this.message = message);

    this._http.getEnrolled(this.message).subscribe((data) => {
      this.Enrolled = data
      console.log(this.Enrolled);
      this.filledCourses = this.loadSheet()
    }
  );
  
  this.sheet.disable()
  }
   loadSheet(){
    var A = 1
    var B = 1
    var C = 1
    var D = 1
    var tempM = new Map()
    for ( var enroll in this.Enrolled){
     if(this.Enrolled[enroll].Cat == "A"){
       new Promise(resolve => {
       var dept = 'AD'+A
       var course = 'AC' +A
       var name = 'AN' + A
       this.sheet.controls[dept].setValue(this.Enrolled[enroll].Dept)
       this.sheet.controls[course].setValue(this.Enrolled[enroll].CourseNum)
       this._http.getCourse(this.Enrolled[enroll].Dept,this.Enrolled[enroll].CourseNum).subscribe((data)=>{
         this.courseN=data
         console.log(JSON.parse(JSON.stringify(this.courseN)).Name)
         this.sheet.controls[name].setValue(JSON.parse(JSON.stringify(this.courseN)).Name)
         console.log()
       });
       A= A+1
       resolve()
       var newEntry = new EnrollData;
       newEntry.sid = this.message
       newEntry.Dept = this.sheet.get(dept).value
       newEntry.CourseNum = this.sheet.get(course).value
       newEntry.Cat = "A"
       newEntry.Grade = 'NA'
       newEntry.Semester = 'F20'
       tempM.set(dept,newEntry)
      });

    }
    }
    return tempM
  }
  processData(D: string,C: string,N: string, Cat: string){
      console.log(this.filledCourses)
      console.log("fill in procc "+this.filledCourses.get(D))
      console.log(this.filledCourses.has(D))
      if(this.filledCourses.has(D)){
        this.putEnroll(D,C,N,Cat)
      }
      else{
        this.submitEnroll(D,C,N,Cat)
      }
  }
  submitEnroll(D: string,C: string,N: string, Cat: string){
    var enrollSub = new EnrollData
    enrollSub.sid = this.message
    enrollSub.Dept = this.sheet.get(D).value
    enrollSub.CourseNum = this.sheet.get(C).value
    enrollSub.Cat = Cat
    enrollSub.Grade = 'NA'
    enrollSub.Semester = 'F20'
    this._http.postEnroll(enrollSub).subscribe((res: EnrollResData)=> {
      this.eResData = res;
      this.filledCourses.set(D,enrollSub)
      console.log(this.eResData.RESULT)
      if(this.eResData.RESULT == 'FALSE'){
        let courseSub = this.createCourse(D,C,N,Cat)
        this._http.postCourse(courseSub).subscribe((res: CourseData) =>{
          this.submitEnroll(D,C,N,Cat)
        })
        
      }
      
    });
  }
  createCourse(D: string,C: string,N: string,Cat: string){
    var courseSub = new CourseData;
    courseSub.CourseNum = this.sheet.get(C).value
    courseSub.Dept = this.sheet.get(D).value
    courseSub.Name = this.sheet.get(N).value;
    return courseSub
  }
  putEnroll(D: string,C: string,N: string,Cat: string){
    var enrollSub = new EnrollData
    enrollSub.sid = this.message
    enrollSub.Dept = this.sheet.get(D).value
    enrollSub.CourseNum = this.sheet.get(C).value
    enrollSub.Cat = Cat
    enrollSub.Grade = 'NA'
    enrollSub.Semester = 'F20'
    var oldData = new EnrollData;
    oldData = this.filledCourses.get(D)
    console.log(oldData)
    this._http.putEnroll(enrollSub,oldData).subscribe((res: EnrollResData)=> {
      this.eResData = res;
      console.log(this.eResData.RESULT)
      if(this.eResData.RESULT == 'FALSE'){
        let courseSub = this.createCourse(D,C,N,Cat)
        this._http.postCourse(courseSub).subscribe((res: CourseData) =>{
          this.cResData = res;
          console.log(this.cResData)
          this._http.putEnroll(enrollSub,oldData).subscribe((res2: EnrollResData)=>{
           this.eResData = res2;
           console.log(this.eResData.RESULT)
          });
    });

      }
    });
  }
  toggle(D: string,C: string,N: string,Cat: string){
    if(this.sheet.get(D).disabled){
      this.sheet.get(D).enable()
      this.sheet.get(C).enable()
      this.sheet.get(N).enable()
    }
    else{
      this.sheet.get(D).disable()
      this.sheet.get(C).disable()
      this.sheet.get(N).disable()
      this.processData(D,C,N,Cat)

    }
  }

  
}