import { HttpService } from 'src/app/http.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/cur-user.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { EnrollData, EnrollResData } from '../enrollSubmit';
import { CourseData } from '../courseSubmit';
import { StudentData } from 'src/app/landing-page/StudentData';

@Component({
  selector: 'app-it',
  templateUrl: './it.component.html',
  styleUrls: ['./it.component.css']
})
export class ITComponent implements OnInit {
  message: StudentData;
  form: FormGroup;
  EnrolledIT: Map<number,EnrollData>;
  Enrolled: EnrollData;
  filledCourses: Map<any,any>;
  enableStat: Array<boolean>;
  checked: Array<boolean>;
  COH1: boolean;
  DIH1: boolean;
  DIH2: boolean;
  constructor(private _http: HttpService, private data: DataService, private fb: FormBuilder) { 
    this.form = this.fb.group({
    checkArray: this.fb.array([])})
  }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
    this.getEnroll()
    //this.isDisabled=true;
    this.EnrolledIT =this.getEnroll()
    this._http.getEnrolled(this.message.id).subscribe((data: EnrollData) => {
      this.Enrolled = data
      console.log(this.Enrolled);
      this.filledCourses = this.loadSheet()
    });
    console.log(this.Enrolled)
   var tmp = new Array<boolean>();
   for(let i in this.RCourses){
     tmp.push(true);
   }
   this.enableStat = tmp;
   this.sheet.disable()
  }

  sheet = new FormGroup({
    COD1: new FormControl(''),
    COC1: new FormControl(''),
    CON1: new FormControl(''),
    COG1: new FormControl(''),
    COS1: new FormControl(''),
    COH1: new FormControl(''),
    //DI
    DID1: new FormControl('PHI'),
    DIC1: new FormControl('40'),
    DIN1: new FormControl('INTRO TO ETHICS'),
    DIG1: new FormControl(''),
    DIH1: new FormControl(''),
    DIS1: new FormControl(''),
    DID2: new FormControl('MAT'),
    DIC2: new FormControl('140'),
    DIN2: new FormControl('Applied Statistics'),
    DIG2: new FormControl(''),
    DIS2: new FormControl(''),
    DIH2: new FormControl(''),
    //E1
    E3D1: new FormControl(''),
    E3C1: new FormControl(''),
    E3N1: new FormControl(''),
    E3G1: new FormControl(''),
    E3S1: new FormControl(''),
    E3D2: new FormControl(''),
    E3C2: new FormControl(''),
    E3N2: new FormControl(''),
    E3G2: new FormControl(''),
    E3S2: new FormControl(''),
    E3D3: new FormControl(''),
    E3C3: new FormControl(''),
    E3N3: new FormControl(''),
    E3G3: new FormControl(''),
    E3S3: new FormControl(''),
    E3D4: new FormControl(''),
    E3C4: new FormControl(''),
    E3N4: new FormControl(''),
    E3G4: new FormControl(''),
    E3S4: new FormControl(''),
    E3D5: new FormControl(''),
    E3C5: new FormControl(''),
    E3N5: new FormControl(''),
    E3G5: new FormControl(''),
    E3S5: new FormControl(''),
    E3D6: new FormControl(''),
    E3C6: new FormControl(''),
    E3N6: new FormControl(''),
    E3G6: new FormControl(''),
    E3S6: new FormControl(''),
    //E2
    E2D1: new FormControl(''),
    E2C1: new FormControl(''),
    E2N1: new FormControl(''),
    E2G1: new FormControl(''),
    E2S1: new FormControl(''),
    E2D2: new FormControl(''),
    E2C2: new FormControl(''),
    E2N2: new FormControl(''),
    E2G2: new FormControl(''),
    E2S2: new FormControl(''),
    E2D3: new FormControl(''),
    E2C3: new FormControl(''),
    E2N3: new FormControl(''),
    E2G3: new FormControl(''),
    E2S3: new FormControl(''),
    E2D4: new FormControl(''),
    E2C4: new FormControl(''),
    E2N4: new FormControl(''),
    E2G4: new FormControl(''),
    E2S4: new FormControl(''),
    E2D5: new FormControl(''),
    E2C5: new FormControl(''),
    E2N5: new FormControl(''),
    E2G5: new FormControl(''),
    E2S5: new FormControl(''),
    E2D6: new FormControl(''),
    E2C6: new FormControl(''),
    E2N6: new FormControl(''),
    E2G6: new FormControl(''),
    E2S6: new FormControl(''),
  });
  RCourses: Array<CourseData> = [
    { Name: 'DISCRETE MATH FOR CS I', CourseNum: 125, Dept: 'CSC' },
    { Name: 'IT FUNDAMENTALS', CourseNum: 130, Dept: 'CSC' },
    { Name: 'COMP SCI I', CourseNum: 135, Dept: 'CSC' },
    { Name: 'COMP SCI II', CourseNum: 136, Dept: 'CSC' },
    { Name: 'OO MULTIMEDIA PROG.', CourseNum: 220, Dept: 'CSC' },
    { Name: 'ADVANCED SCIENTIFIC PROG. ', CourseNum: 223, Dept: 'CSC' },
    { Name: 'WEB PROGRAMMING', CourseNum: 242, Dept: 'CSC' },
    { Name: 'UNIX SCRIPTING AND ADMINISTRATION', CourseNum: 252, Dept: 'CSC' },
    { Name: 'IT SYSTEMS', CourseNum: 253, Dept: 'CSC' },
    { Name: 'COMPUTING SYSTEMS INTEGRATION', CourseNum: 273, Dept: 'CSC' },
    { Name: 'COMPUTER NETWORKS', CourseNum: 311, Dept: 'CSC' },
    { Name: 'INFORMATION SECURITY', CourseNum: 341, Dept: 'CSC' },
    { Name: 'INTRODUCTION TO DATABASE SYS', CourseNum: 356, Dept: 'CSC' },
    { Name: 'SOFTWARE ENGINEERING I', CourseNum: 354, Dept: 'CSC' },
    { Name: 'SOFTWARE ENGINEERING II', CourseNum: 355, Dept: 'CSC' }
    
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
    this._http.getEnrolled(this.message.id).subscribe((data: EnrollData ) => {
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
      enrollSub.sid = this.message.id
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
    enrollSub.sid = this.message.id
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
     if(this.Enrolled[enroll].Dept == "MAT" && this.Enrolled[enroll].CourseNum >=105 && this.Enrolled[enroll].Cat == 'CO'  ){
       console.log
      this.COH1= true;
      new Promise(resolve => {
        var dept = 'COD1'
        var course = 'COC1'
        var name = 'CON1'
        var grade = "COG1"
        var sem = "COS1"
        this.sheet.controls[dept].setValue(this.Enrolled[enroll].Dept)
        this.sheet.controls[course].setValue(this.Enrolled[enroll].CourseNum)
        this.sheet.controls[grade].setValue(this.Enrolled[enroll].Grade)
        this.sheet.controls[sem].setValue(this.Enrolled[enroll].Semester)
       this._http.getCourse(this.Enrolled[enroll].Dept,this.Enrolled[enroll].CourseNum).subscribe((data)=>{
         let courseN=data
         console.log(JSON.parse(JSON.stringify(courseN)).Name)
         console.log()
       });
       
       resolve()
       var newEntry = new EnrollData;
       newEntry.sid = this.message.id
       newEntry.Dept = this.sheet.get(dept).value
       newEntry.CourseNum = this.sheet.get(course).value
       newEntry.Cat = this.sheet.get(course).value
       newEntry.Grade = this.sheet.get(grade).value
       newEntry.Semester = this.sheet.get(sem).value
       tempM.set(dept,newEntry)
      }); 
       
     }
     console.log("enrolled:" + this.Enrolled[enroll].Dept)
     if(this.Enrolled[enroll].Dept == "PHI" && this.Enrolled[enroll].CourseNum == 40 ){
       console.log
      this.COH1= true;
      new Promise(resolve => {
        var dept = 'DID1'
        var course = 'DIC1'
        var name = 'DIN1'
        var grade = "DIG1"
        var sem = "DIS1"
       this.sheet.controls[grade].setValue(this.Enrolled[enroll].Grade)
       this.sheet.controls[sem].setValue(this.Enrolled[enroll].Semester)
       this._http.getCourse(this.Enrolled[enroll].Dept,this.Enrolled[enroll].CourseNum).subscribe((data)=>{
         let courseN=data
         console.log(JSON.parse(JSON.stringify(courseN)).Name)
         console.log()
       });
       
       resolve()
       var newEntry = new EnrollData;
       newEntry.sid = this.message.id
       newEntry.Dept = this.sheet.get(dept).value
       newEntry.CourseNum = this.sheet.get(course).value
       newEntry.Cat = this.sheet.get(course).value
       newEntry.Grade = this.sheet.get(grade).value
       newEntry.Semester = this.sheet.get(sem).value
       tempM.set(dept,newEntry)
      }); 
       
     }
     console.log("enrolled:" + this.Enrolled[enroll].Dept)
     if(this.Enrolled[enroll].Dept == "MAT" && this.Enrolled[enroll].CourseNum == 260  ){
       console.log
      this.COH1= true;
      new Promise(resolve => {
        var dept = 'DID2'
        var course = 'DIC2'
        var name = 'DIN2'
        var grade = "DIG2"
        var sem = "DIS2"
       this.sheet.controls[grade].setValue(this.Enrolled[enroll].Grade)
       this.sheet.controls[sem].setValue(this.Enrolled[enroll].Semester)
       this._http.getCourse(this.Enrolled[enroll].Dept,this.Enrolled[enroll].CourseNum).subscribe((data)=>{
         let courseN=data
         console.log(JSON.parse(JSON.stringify(courseN)).Name)
         console.log()
       });
       
       resolve()
       var newEntry = new EnrollData;
       newEntry.sid = this.message.id
       newEntry.Dept = this.sheet.get(dept).value
       newEntry.CourseNum = this.sheet.get(course).value
       newEntry.Cat = this.sheet.get(course).value
       newEntry.Grade = this.sheet.get(grade).value
       newEntry.Semester = this.sheet.get(sem).value
       tempM.set(dept,newEntry)
      }); 
       
     }
     if(this.Enrolled[enroll].Cat == "E2"){

      new Promise(resolve => {
       var dept = 'E2D'+A
       var course = 'E2C' +A
       var name = 'E2N' + A
       var grade = "E2G" + A
       var sem = "E2S"+A
      this.sheet.controls[dept].setValue(this.Enrolled[enroll].Dept)
      this.sheet.controls[course].setValue(this.Enrolled[enroll].CourseNum)
      this.sheet.controls[grade].setValue(this.Enrolled[enroll].Grade)
      this.sheet.controls[sem].setValue(this.Enrolled[enroll].Semester)
      this._http.getCourse(this.Enrolled[enroll].Dept,this.Enrolled[enroll].CourseNum).subscribe((data: CourseData)=>{
        this.sheet.controls[name].setValue(data.Name)
        console.log()
      });
      A= A+1
      resolve()
      console.log(this.message.id)
      var newEntry = new EnrollData;
      newEntry.sid = this.message.id
      newEntry.Dept = this.sheet.get(dept).value
      newEntry.CourseNum = this.sheet.get(course).value
      newEntry.Cat = this.sheet.get(course).value
      newEntry.Grade = this.sheet.get(grade).value
      newEntry.Semester = this.sheet.get(sem).value
      tempM.set(dept,newEntry)
     }); 
   }
   else if(this.Enrolled[enroll].Cat == "E3"){

      new Promise(resolve => {
       var dept = 'E3D'+B
       var course = 'E3C' +B
       var name = 'E3N' + B
       var grade = "E3G" + B
       var sem = "E3S"+B
      this.sheet.controls[dept].setValue(this.Enrolled[enroll].Dept)
      this.sheet.controls[course].setValue(this.Enrolled[enroll].CourseNum)
      this.sheet.controls[grade].setValue(this.Enrolled[enroll].Grade)
      this.sheet.controls[sem].setValue(this.Enrolled[enroll].Semester)
      this._http.getCourse(this.Enrolled[enroll].Dept,this.Enrolled[enroll].CourseNum).subscribe((data: CourseData)=>{
        this.sheet.controls[name].setValue(data.Name)
        console.log()
      });
      B= B+1
      resolve()
      var newEntry = new EnrollData;
      newEntry.sid = this.message.id
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
 
  toggle3(D: string,C: string,N: string, G: string, S: string, Cat: string, H: string){
    if(this.sheet.get(G).disabled){
      this.sheet.get(G).enable()
      this.sheet.get(S).enable()
      this.sheet.get(H).enable()
    }
    else{
      this.sheet.get(G).disable()
      this.sheet.get(S).disable()
      this.sheet.get(H).disable()
      this.processData2(D,C,N,G,S,Cat,H)

    }
  }

  toggle2(D: string,C: string,N: string, G: string, S: string, Cat: string){
    console.log(N)
    if(this.sheet.get(G).disabled){
      this.sheet.get(D).enable()
      this.sheet.get(C).enable()
      this.sheet.get(N).enable()
      this.sheet.get(G).enable()
      this.sheet.get(S).enable()
    }
    else{
      this.sheet.get(D).disable()
      this.sheet.get(C).disable()
      this.sheet.get(N).disable()
      this.sheet.get(G).disable()
      this.sheet.get(S).disable()
      this.processData(D,C,N,G,S,Cat)

    }
  }
  processData(D: string,C: string,N: string, G: string, S: string, Cat: string){
    console.log(this.filledCourses)
    console.log("fill in procc "+this.filledCourses.get(D))
    console.log(this.filledCourses.has(D))
    if(this.filledCourses.has(D)){
      this.putEnrollS(D,C,N,G,S,Cat)
    }
    else{
      this.submitEnrollS(D,C,N,G,S,Cat)
    }
  }
  processData2(D: string,C: string,N: string, G: string, S: string, Cat: string, H){
    console.log("fill in procc "+this.filledCourses.get(D))
    console.log(this.filledCourses.has(D))
    if(this.filledCourses.has(D)){
      this.putEnrollS(D,C,N,G,S,Cat)
    }
    else if (H="COH1"){
      if(this.COH1 = true){
      this.submitEnrollS(D,C,N,G,S,Cat)
      }
    }
  }
  putEnrollS(D: string,C: string,N: string, G: string, S: string, Cat: string){
    var enrollSub = new EnrollData
    enrollSub.sid = this.message.id
    enrollSub.Dept = this.sheet.get(D).value
    enrollSub.CourseNum = this.sheet.get(C).value
    enrollSub.Cat = Cat
    enrollSub.Grade = this.sheet.get(G).value
    enrollSub.Semester = this.sheet.get(S).value
    var oldData = new EnrollData;
    oldData = this.filledCourses.get(D)
    console.log(oldData)
    this._http.putEnroll(enrollSub,oldData).subscribe((res: EnrollResData)=> {
      let eResData = res;
      console.log(eResData.RESULT)
      if(eResData.RESULT == 'FALSE'){
        var courseSub = new CourseData;
        courseSub.CourseNum = this.sheet.get(C).value
        courseSub.Dept = this.sheet.get(D).value
        courseSub.Name = this.sheet.get(N).value;
        this._http.postCourse(courseSub).subscribe((res: CourseData) =>{
          let cResData = res;
          console.log(cResData)
          this._http.putEnroll(enrollSub,oldData).subscribe((res2: EnrollResData)=>{
           eResData = res2;
           console.log(eResData.RESULT)
          });
         });
      }
    });
  }
  submitEnrollS(D: string,C: string,N: string, G: string, S: string, Cat: string){
    var enrollSub = new EnrollData
    enrollSub.sid = this.message.id
    enrollSub.Dept = this.sheet.get(D).value
    enrollSub.CourseNum = this.sheet.get(C).value
    enrollSub.Cat = Cat
    enrollSub.Grade = this.sheet.get(G).value
    enrollSub.Semester = this.sheet.get(S).value
    this._http.postEnroll(enrollSub).subscribe((res: EnrollResData)=> {
      let eResData = res;
      console.log(eResData)
      this.filledCourses.set(D,enrollSub)
      console.log(eResData.RESULT)
      if(eResData.RESULT == 'FALSE'){
        var courseSub = new CourseData;
        courseSub.CourseNum = this.sheet.get(C).value
        courseSub.Dept = this.sheet.get(D).value
        courseSub.Name = this.sheet.get(N).value;
        this._http.postCourse(courseSub).subscribe((res: CourseData) =>{
          this.submitEnrollS(D,C,N,G,S,Cat)
        })
        
      }
      
    });
  }
  changeDI1(){
    if(this.DIH1){
      this.DIH1 = false
    }
    else{
      this.DIH1 = true;
    }
  }
  changeDI2(){
    if(this.DIH2){
      this.DIH2 = false
    }
    else{
      this.DIH2 = true;
    }
  }
}
