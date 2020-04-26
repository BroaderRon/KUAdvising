import { Component, OnInit } from '@angular/core';
import { OktaAuthService, UserClaims } from '@okta/okta-angular';
import { HttpService } from '../http.service';
import { EnrollResData, EnrollData } from '../checksheet/enrollSubmit';
import { AdivsorData } from './AdvisorData';
import { StudentData } from './StudentData';
import { StuArr } from '../home/StuArr';
import { FormGroup, FormControl } from '@angular/forms';

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


  constructor(public oktaAuth: OktaAuthService,private _http: HttpService) {
    
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
}

