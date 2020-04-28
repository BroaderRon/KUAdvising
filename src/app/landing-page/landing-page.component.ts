import { Component, OnInit } from '@angular/core';
import { OktaAuthService, UserClaims } from '@okta/okta-angular';
import { HttpService } from '../http.service';
import { EnrollResData, EnrollData } from '../checksheet/enrollSubmit';
import { AdivsorData } from './AdvisorData';
import { StudentData } from './StudentData';
import { StuArr } from '../home/StuArr';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../cur-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  Stus: StudentData;
  ToggleCreateB = false;
  showCreate = false;
  StuRadio: string = "a"
  userclaimC: UserClaims;
  createStudent = new FormGroup({
    NS1: new FormControl('')
  });


  constructor(public oktaAuth: OktaAuthService,private _http: HttpService,private data: DataService,private router: Router) {
    
  }

  async ngOnInit() {
    // returns an array of claims
    const userClaims = await this.oktaAuth.getUser();
    this.userclaimC = userClaims
  this._http.getAdvisor(userClaims.email).subscribe((res: EnrollResData ) =>{
    console.log(res.RESULT)
    if(res.RESULT == "TRUE"){//get stus
      console.log("HERE")
      this._http.getStudentA(userClaims.email).subscribe((res2: StudentData)=>{

        this.Stus = res2
        console.log(this.Stus)
      })
      
    }
    else if(res.RESULT == "FALSE"){
      let postA = new AdivsorData;
      postA.Name = userClaims.name;
      postA.Email = userClaims.email;
      console.log(postA)
      this._http.postAdvisor(postA).subscribe((res: AdivsorData)=>{
        console.log(res)
      });

    }
  })


  }
  toggleC(){
    console.log("here")
    this.ToggleCreateB = true;
    this.showCreate= true;

  }
  openSheet(Stu:StudentData){
    console.log(Stu)
    console.log(this.userclaimC.email)
    this.data.changeMessage(Stu);
    if(Stu.major =="Computer Science"){
      this.router.navigate(['./checksheet/CS']);
    }
    else{
      this.router.navigate(['./checksheet/IT']);
    }
  }
  newStu(id,name){
    console.log(this.createStudent.get('NS1').value)
    let tmp = new StudentData;
    tmp.name = name;
    tmp.id = id;
    tmp.Aemail = this.userclaimC.email;
    tmp.major = this.createStudent.get('NS1').value
    this._http.postStudent(tmp).subscribe((ret: StudentData)=>{
      console.log(ret)
    })
    this.data.changeMessage(tmp);
    if(tmp.major =="Computer Science"){
      this.router.navigate(['./checksheet/CS']);
    }
    else{
      this.router.navigate(['./checksheet/IT']);
    }
  }

}
