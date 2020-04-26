import { HttpService } from 'src/app/http.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/cur-user.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { EnrollData, EnrollResData } from '../enrollSubmit';
import { CourseData } from '../courseSubmit';

@Component({
  selector: 'app-it',
  templateUrl: './it.component.html',
  styleUrls: ['./it.component.css']
})
export class ITComponent implements OnInit {
  message: any;
  form: FormGroup;
  EnrolledIT: Map<number,EnrollData>;
  Enrolled: EnrollData;
  filledCourses: Map<any,any>;
  enableStat: Array<boolean>;
  checked: Array<boolean>;
  COH1: boolean;
  constructor(private _http: HttpService, private data: DataService, private fb: FormBuilder) { 
    this.form = this.fb.group({
    checkArray: this.fb.array([])})
  }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
    this.getEnroll()
    //this.isDisabled=true;
    this.EnrolledIT =this.getEnroll()
    this._http.getEnrolled(this.message).subscribe((data: EnrollData) => {
      this.Enrolled = data
      console.log(this.Enrolled);
      //this.filledCourses = this.loadSheet()
    });
    console.log(this.Enrolled)
   var tmp = new Array<boolean>();
   for(let i in this.RCourses){
     tmp.push(true);
   }
   this.enableStat = tmp;
  }

  sheet = new FormGroup({
    COD1: new FormControl(''),
    COC1: new FormControl(''),
    CON1: new FormControl(''),
    COG1: new FormControl(''),
    COS1: new FormControl(''),
    COH1: new FormControl(''),
  });
  RCourses: Array<CourseData> = [
    { Name: 'CSC 125: DISCRETE MATH FOR CS I', CourseNum: 125, Dept: 'CSC' },
    { Name: 'CSC 130: IT FUNDAMENTALS', CourseNum: 130, Dept: 'CSC' },
    { Name: 'CSC 135: COMP SCI I', CourseNum: 135, Dept: 'CSC' },
    { Name: 'CSC 136: COMP SCI II', CourseNum: 136, Dept: 'CSC' },
    { Name: 'CSC 220: OO MULTIMEDIA PROG.', CourseNum: 220, Dept: 'CSC' },
    { Name: 'CSC 223: ADVANCED SCIENTIFIC PROG. ', CourseNum: 223, Dept: 'CSC' },
    { Name: 'CSC 242: WEB PROGRAMMING', CourseNum: 242, Dept: 'CSC' },
    { Name: 'CSC 252: UNIX SCRIPTING AND ADMINISTRATION', CourseNum: 252, Dept: 'CSC' },
    { Name: 'CSC 253: IT SYSTEMS', CourseNum: 253, Dept: 'CSC' },
    { Name: 'CSC 273: COMPUTING SYSTEMS INTEGRATION', CourseNum: 273, Dept: 'CSC' },
    { Name: 'CSC 311: COMPUTER NETWORKS', CourseNum: 311, Dept: 'CSC' },
    { Name: 'CSC 341: INFORMATION SECURITY', CourseNum: 341, Dept: 'CSC' },
    { Name: 'CSC 356: INTRODUCTION TO DATABASE SYS', CourseNum: 356, Dept: 'CSC' },
    { Name: 'CSC 354: SOFTWARE ENGINEERING I', CourseNum: 354, Dept: 'CSC' },
    { Name: 'CSC 355: SOFTWARE ENGINEERING II', CourseNum: 355, Dept: 'CSC' }
    
  ];

  CCourses: Array<any> = [
    { name: 'MAT 105: COLLEGE ALGEBRA ', CourseNum: '105', Dept: 'MAT' }
  ];

  DGECourses: Array<any> = [
    { name: 'PHI 40: INTRO TO ETHICS', CourseNum: '40', Dept: 'PHI', GE: 'B'},
    { name: 'MAT 140: APPLIED STATISTICS', CourseNum: '140', Dept: 'MAT', GE: 'C. 2' }
  ]

  onCheckboxChange(e,index) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
    console.log(name)
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
      console.log(index)
      console.log(this.checked[index])
      this.checked[index] = true;

    } else {
      this.checked[index] = false;
      console.log(index)
      console.log(this.checked[index])
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
    let temp = new Map<number, EnrollData>()
    this._http.getEnrolled(this.message).subscribe((data: EnrollData ) => {
    for(let i in data){
      if(data[i].Dept == 'CSC'){
        console.log("data[i]")
        console.log(data[i])
        temp.set(data[i].CourseNum,data[i])
        console.log("ADDING: "+ data[i].courseNum)

      }
    }
    console.log("temp")
    console.log(temp)
    this.EnrolledIT = temp;
    var tmp = new Array<boolean>();
    for(let i of this.RCourses){
      console.log(i.CourseNum)
      console.log(this.EnrolledIT)
      console.log(this.EnrolledIT.has(i.CourseNum))
      if(temp.has(i.CourseNum)){
        tmp.push(true)
      }
      else{
        tmp.push(false)
      }
    }
    this.checked = tmp
    console.log("CHECKDD S S S S S S S")
      console.log(this.checked);
    }
  );
  return temp;
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
      this.EnrolledIT.set(coursenum,enrollSub)
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
  putEnrollM(name,coursenum: number,dept,grade,semester,box,cat){
    var enrollSub = new EnrollData
    enrollSub.sid = this.message
    enrollSub.Dept = dept
    enrollSub.CourseNum = coursenum
    enrollSub.Cat = cat
    enrollSub.Grade = grade
    enrollSub.Semester = semester
    var oldData = new EnrollData;
    oldData = this.EnrolledIT.get(coursenum)
    console.log(oldData)
    this._http.putEnroll(enrollSub,oldData).subscribe((res: EnrollResData)=> {
     let eResData = res;
      console.log(eResData.RESULT)
      if(eResData.RESULT == 'FALSE'){
        var courseSub = new CourseData;
        courseSub.CourseNum = coursenum
        courseSub.Dept = dept
        courseSub.Name = name
        this._http.postCourse(courseSub).subscribe((res: CourseData) =>{
          let cResData = res;
          console.log(cResData)
          this._http.putEnroll(enrollSub,oldData).subscribe((res2: EnrollResData)=>{
           let eResData = res2;
           console.log(eResData.RESULT)
          });
        });

      }
    });
  }
  toggle(index, name,coursenum,dept,grade,semester,box,cat){
    console.log(index)
    console.log(this.checked[index])
    if(this.enableStat[index]){
      this.enableStat[index] = false;
    }
    else if(this.checked[index]){
      console.log("In else if")
      this.enableStat[index] = true
      if(this.EnrolledIT.has(coursenum)){
        console.log("in if in else if")
        this.putEnrollM(name,coursenum,dept,grade,semester,box,cat)
      }
      else{
        console.log("in else")
        this.enableStat[index] = true
      this.submitEnroll(name,coursenum,dept,grade,semester,box,cat)
      }
    }
  }
  loadSheet(){
    var A = 1
    var B = 1
    var tempM = new Map()
    console.log("in load")
    for ( let enroll in this.Enrolled){
      console.log("enrolled:" + this.Enrolled[enroll].Dept)
     if(this.Enrolled[enroll].Dept == "MAT" && this.Enrolled[enroll].CourseNum == 260  ){
       console.log
      this.COH1= true;
      new Promise(resolve => {
        var dept = 'COD1'
        var course = 'COC1'
        var name = 'CON1'
        var grade = "COG1"
        var sem = "COS1"
       this.sheet.controls[grade].setValue(this.Enrolled[enroll].Grade)
       this.sheet.controls[sem].setValue(this.Enrolled[enroll].Semester)
       this._http.getCourse(this.Enrolled[enroll].Dept,this.Enrolled[enroll].CourseNum).subscribe((data)=>{
         let courseN=data
         console.log(JSON.parse(JSON.stringify(courseN)).Name)
         console.log()
       });
       
       resolve()
       var newEntry = new EnrollData;
       newEntry.sid = this.message
       newEntry.Dept = this.sheet.get(dept).value
       newEntry.CourseNum = this.sheet.get(course).value
       newEntry.Cat = this.sheet.get(course).value
       newEntry.Grade = this.sheet.get(grade).value
       newEntry.Semester = this.sheet.get(sem).value
       tempM.set(dept,newEntry)
      }); 
       
     }
     
    }
    return tempM;
  }
}
