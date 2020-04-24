import { Component, OnInit } from '@angular/core';
import {CourseData} from '../courseSubmit'
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { DataService } from 'src/app/cur-user.service';
import { HttpService } from 'src/app/http.service';
import { EnrollData, EnrollResData } from '../enrollSubmit';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-cs',
  templateUrl: './cs.component.html',
  styleUrls: ['./cs.component.css']
})
export class CSComponent implements OnInit {
    form: FormGroup;
    Enrolled: EnrollData;
    enableStat: Array<boolean>;
    checked: Array<boolean>;
    filledCourses: Map<any,any>;
    COH1: boolean;
    DIH1: boolean;
    DIH2: boolean;
    RCourses: Array<CourseData> =[{CourseNum: 125, Dept: 'CSC', Name: "Discrete Math 1"},
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
    EnrolledCS: Map<any,EnrollData>;
    sheet = new FormGroup({
      COD1: new FormControl('MAT'),
      COC1: new FormControl('260'),
      CON1: new FormControl('LINEAR ALGEBRA'),
      COG1: new FormControl(''),
      COS1: new FormControl(''),
      COH1: new FormControl(''),
      COD2: new FormControl(''),
      COC2: new FormControl(''),
      CON2: new FormControl(''),
      COG2: new FormControl(''),
      COS2: new FormControl(''),
      COD3: new FormControl(''),
      COC3: new FormControl(''),
      CON3: new FormControl(''),
      COG3: new FormControl(''),
      COS3: new FormControl(''),
      //DIRECRTED
      DID1: new FormControl('PHI'),
      DIC1: new FormControl('40'),
      DIN1: new FormControl('ETHICS'),
      DIG1: new FormControl(''),
      DIH1: new FormControl(''),
      DIS1: new FormControl(''),
      DID2: new FormControl('MAT'),
      DIC2: new FormControl('181'),
      DIN2: new FormControl('CALCULUS'),
      DIG2: new FormControl(''),
      DIS2: new FormControl(''),
      DIH2: new FormControl(''),
      DID3: new FormControl(''),
      DIC3: new FormControl(''),
      DIN3: new FormControl(''),
      DIG3: new FormControl(''),
      DIS3: new FormControl(''),
      DID4: new FormControl(''),
      DIC4: new FormControl(''),
      DIN4: new FormControl(''),
      DIG4: new FormControl(''),
      DIS4: new FormControl(''),
    });
  ngOnInit() {
    this.COH1 = false;
    this.DIH1 = false;
    this.DIH2 = false;
    this.data.currentMessage.subscribe(message => this.message = message);
    this.isDisabled=true;
    this.getEnroll()
    this._http.getEnrolled(this.message).subscribe((data: EnrollData) => {
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
  
   console.log(this.checked)
   
   this.sheet.disable()
  }

  onCheckboxChange(e, index) {
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
        temp.set(data[i].CourseNum,data[i])
        console.log("ADDING: "+ data[i].courseNUM)

      }
    }
    this.EnrolledCS = temp;
    var tmp = new Array<boolean>();
    for(let i of this.RCourses){
      console.log(i.CourseNum)
      console.log(this.EnrolledCS)
      console.log(this.EnrolledCS.has(i.CourseNum))
      if(this.EnrolledCS.has(i.CourseNum)){
        tmp.push(true)
      }
      else{
        tmp.push(false)
      }
    }
    this.checked = tmp
      //console.log(this.Enrolled);
    }
  );
  return temp;
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
      if(this.EnrolledCS.has(coursenum)){
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
  submitEnroll(name,coursenum: number,dept,grade,semester,box,cat){
    console.log(semester)
      var enrollSub = new EnrollData
      enrollSub.sid = this.message
      enrollSub.Dept = dept
      enrollSub.CourseNum = coursenum
      enrollSub.Cat = cat
      enrollSub.Grade = grade
      enrollSub.Semester = semester
      this.EnrolledCS.set(coursenum,enrollSub)
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
    oldData = this.EnrolledCS.get(coursenum)
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
     if(this.Enrolled[enroll].Cat == "CO"){
       if(this.Enrolled[enroll].Dept == "MAT" && this.Enrolled[enroll].CourseNum > 181 && this.Enrolled[enroll].CourseNum != 260){
        new Promise(resolve => {
          var dept = 'COD2'
          var course = 'COC2'
          var name = 'CON2'
          var grade = "COG2"
          var sem = "COS2"
         this.sheet.controls[dept].setValue(this.Enrolled[enroll].Dept)
         this.sheet.controls[course].setValue(this.Enrolled[enroll].CourseNum)
         this.sheet.controls[grade].setValue(this.Enrolled[enroll].Grade)
         this.sheet.controls[sem].setValue(this.Enrolled[enroll].Semester)
         this._http.getCourse(this.Enrolled[enroll].Dept,this.Enrolled[enroll].CourseNum).subscribe((data)=>{
           let courseN=data
           console.log(JSON.parse(JSON.stringify(courseN)).Name)
           this.sheet.controls[name].setValue(JSON.parse(JSON.stringify(courseN)).Name)
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
      else if (this.Enrolled[enroll].Dept != "MAT"){
        new Promise(resolve => {
          var dept = 'COD3'
          var course = 'COC3'
          var name = 'CON3'
          var grade = "COG3"
          var sem = "COS3"
         this.sheet.controls[dept].setValue(this.Enrolled[enroll].Dept)
         this.sheet.controls[course].setValue(this.Enrolled[enroll].CourseNum)
         this.sheet.controls[grade].setValue(this.Enrolled[enroll].Grade)
         this.sheet.controls[sem].setValue(this.Enrolled[enroll].Semester)
         this._http.getCourse(this.Enrolled[enroll].Dept,this.Enrolled[enroll].CourseNum).subscribe((data)=>{
           let courseN=data
           console.log(JSON.parse(JSON.stringify(courseN)).Name)
           this.sheet.controls[name].setValue(JSON.parse(JSON.stringify(courseN)).Name)
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
    else if(this.Enrolled[enroll].Cat == "DI"){
      if(this.Enrolled[enroll].Dept == "PHI" && this.Enrolled[enroll].CourseNum == 40  ){
       this.DIH1 = true;
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
        newEntry.sid = this.message
        newEntry.Dept = this.sheet.get(dept).value
        newEntry.CourseNum = this.sheet.get(course).value
        newEntry.Cat = this.sheet.get(course).value
        newEntry.Grade = this.sheet.get(grade).value
        newEntry.Semester = this.sheet.get(sem).value
        tempM.set(dept,newEntry)
       }); 
      }
      else if(this.Enrolled[enroll].Dept == "MAT" && this.Enrolled[enroll].CourseNum == 181  ){
       this.DIH1 = true;
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
        newEntry.sid = this.message
        newEntry.Dept = this.sheet.get(dept).value
        newEntry.CourseNum = this.sheet.get(course).value
        newEntry.Cat = this.sheet.get(course).value
        newEntry.Grade = this.sheet.get(grade).value
        newEntry.Semester = this.sheet.get(sem).value
        tempM.set(dept,newEntry)
       }); 
      
      }
      else if((this.Enrolled[enroll].Dept == "MAT" && this.Enrolled[enroll].CourseNum == 140) || (this.Enrolled[enroll].Dept == "MAT" && this.Enrolled[enroll].CourseNum == 301) ){
        this.DIH1 = true;
        new Promise(resolve => {
          var dept = 'DID3'
          var course = 'DIC3'
          var name = 'DIN3'
          var grade = "DIG3"
          var sem = "DIS3"
          this.sheet.controls[dept].setValue(this.Enrolled[enroll].Dept)
          this.sheet.controls[course].setValue(this.Enrolled[enroll].CourseNum)
          this.sheet.controls[grade].setValue(this.Enrolled[enroll].Grade)
          this.sheet.controls[sem].setValue(this.Enrolled[enroll].Semester)
          this._http.getCourse(this.Enrolled[enroll].Dept,this.Enrolled[enroll].CourseNum).subscribe((data)=>{
            let courseN=data
            console.log(JSON.parse(JSON.stringify(courseN)).Name)
            this.sheet.controls[name].setValue(JSON.parse(JSON.stringify(courseN)).Name)
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

  toggle2(D: string,C: string,N: string, G: string, S: string, Cat: string){
    if(this.sheet.get(D).disabled){
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
  toggle3(D: string,C: string,N: string, G: string, S: string, Cat: string, H: string){
    if(this.sheet.get(D).disabled){
      this.sheet.get(D).enable()
      this.sheet.get(C).enable()
      this.sheet.get(N).enable()
      this.sheet.get(G).enable()
      this.sheet.get(S).enable()
      this.sheet.get(H).enable()
    }
    else{
      this.sheet.get(D).disable()
      this.sheet.get(C).disable()
      this.sheet.get(N).disable()
      this.sheet.get(G).disable()
      this.sheet.get(S).disable()
      this.sheet.get(H).disable()
      this.processData2(D,C,N,G,S,Cat,H)

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
    enrollSub.sid = this.message
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
    enrollSub.sid = this.message
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
  changeH1(){
    if(this.COH1){
      this.COH1 = false
    }
    else{
      this.COH1 = true;
    }
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