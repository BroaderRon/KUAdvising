import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { DataService } from "../cur-user.service";
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Stus: Object;
  form: FormGroup;

  constructor(private _http: HttpService,private router: Router,private data: DataService, private fb: FormBuilder) {
    this.form = this.fb.group({
      checkArray: this.fb.array([])})
   }
  

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

  Data: Array<any> = [
    { name: 'CSC 125: DISCRETE MATH FOR CS I', value: 'CSC 125' },
    { name: 'CSC 130: IT FUNDAMENTALS', value: 'CSC 130' },
    { name: 'CSC 135: COMP SCI I', value: 'CSC 135' },
    { name: 'CSC 136: COMP SCI II', value: 'CSC 136' },
    { name: 'CSC 220: OO MULTIMEDIA PROG.', value: 'CSC 220' },
    { name: 'CSC 223: ADVANCED SCIENTIFIC PROG. ', value: 'CSC 223' },
    { name: 'CSC 242: WEB PROGRAMMING', value: 'CSC 242' },
    { name: 'CSC 252: UNIX SCRIPTING AND ADMINISTRATION', value: 'CSC 252' },
    { name: 'CSC 253: IT SYSTEMS', value: 'CSC 253' },
    { name: 'CSC 273: COMPUTING SYSTEMS INTEGRATION', value: 'CSC 273' },
    { name: 'CSC 311: COMPUTER NETWORKS', value: 'CSC 311' },
    { name: 'CSC 341: INFORMATION SECURITY', value: 'CSC 341' },
    { name: 'CSC 356: INTRODUCTION TO DATABASE SYS', value: 'CSC 356' },
    { name: 'CSC 354: SOFTWARE ENGINEERING I', value: 'CSC 354' },
    { name: 'CSC 355: SOFTWARE ENGINEERING II', value: 'CSC 355' }
    
  ];

  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
  
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
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
}
