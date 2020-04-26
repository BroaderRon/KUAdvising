import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { DataService } from "../cur-user.service";
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAuthenticated: boolean;
  Stus: Object;

  constructor(private _http: HttpService,private router: Router,private data: DataService, public oktaAuth: OktaAuthService) {
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    );
   }
  

  message;

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    this._http.getStudent().subscribe((data) => {
      this.Stus = data
      console.log(this.Stus);
      if(this.isAuthenticated){
        this.redirectland
      }
    }
  );
  this.data.currentMessage.subscribe(message =>{

   this.message = message
    console.log(this.message)
  });
    
  }
  redirect(id: any){
    this.data.changeMessage(id);
    //this.router.navigate(['./checksheet']);
  }
  redirectland(){
    this.router.navigate(['./landing']);
  }
  login() {
    this.oktaAuth.loginRedirect('/');
  }

}
