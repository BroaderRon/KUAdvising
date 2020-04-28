import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { DataService } from "../cur-user.service";
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements AfterViewInit{
  isAuthenticated: boolean;
  Stus: any;

  constructor(private _http: HttpService,private router: Router,private data: DataService, public oktaAuth: OktaAuthService) {
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    );
   }
  

  message;

 
  async ngAfterViewInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    console.log(this.isAuthenticated)
    if(this.isAuthenticated){
      this.router.navigate(['./landing'])
    }
  }
  redirect(id: any){
    this.data.changeMessage(id);
    //this.router.navigate(['./checksheet']);
  }

  login() {
    this.oktaAuth.loginRedirect('/');
  }

}
