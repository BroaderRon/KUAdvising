import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Stus: Object;

  constructor(private _http: HttpService) { }

  ngOnInit() {
    this._http.getStudent().subscribe(data => {
      this.Stus = data
      console.log(this.Stus);
    }
  );
  }

}
