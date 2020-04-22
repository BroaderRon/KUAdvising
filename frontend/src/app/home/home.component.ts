import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { DataService } from "../cur-user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Stus: Object;

  constructor(private _http: HttpService,private router: Router,private data: DataService) { }

  message;

  ngOnInit() {
    this._http.getStudent().subscribe((data) => {
      this.Stus = data
      console.log(this.Stus);
    }
  );
  this.data.currentMessage.subscribe(message =>{

   this.message = message
    console.log(this.message)
  });

  }
  redirect(id: any){
    this.data.changeMessage(id);
    this.router.navigate(['./checksheet']);
  }
}
