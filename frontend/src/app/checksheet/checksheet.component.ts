import { Component, OnInit, Input } from '@angular/core';
import { DataService } from "../cur-user.service";
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-checksheet',
  templateUrl: './checksheet.component.html',
  styleUrls: ['./checksheet.component.css']
})

export class ChecksheetComponent implements OnInit {
  constructor(private data: DataService,private _http: HttpService) { }
  message;
  Enrolled: Object;

  sheet = new FormGroup({
    A: new FormGroup({
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
      AN4: new FormControl('')
    }),
    B: new FormGroup({
      BD1: new FormControl(''),
      BC1: new FormControl(''),
      BN1: new FormControl(''),
      BD2: new FormControl(''),
      BC2: new FormControl(''),
      BN2: new FormControl(''),
      BD3: new FormControl(''),
      BC3: new FormControl(''),
      BN3: new FormControl('')
    }),
    C: new FormGroup({
      CD1: new FormControl(''),
      CC1: new FormControl(''),
      CN1: new FormControl(''),
      CD2: new FormControl(''),
      CC2: new FormControl(''),
      CN2: new FormControl(''),
      CD3: new FormControl(''),
      CC3: new FormControl(''),
      CN3: new FormControl('')
    }),
    D: new FormGroup({
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
  })

  ngOnInit() {
    //used to get selected student
    this.data.currentMessage.subscribe(message => this.message = message);

    this._http.getEnrolled(this.message).subscribe((data) => {
      this.Enrolled = data
      console.log(this.Enrolled);
    }
  );

  }


}
